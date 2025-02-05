const express = require("express");
const { UserModel } = require("../model/userModel");
const catchAsyncError = require("../middelware/catchAsyncError"); 
const ErrorHandler = require("../utils/errorhadler"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");

let userRoute = express.Router(); 
userRoute.post("/login", async (req, res) => {
    console.log(req.body);

    try {
        const { email, pass } = req.body;

        if (email && pass) {
            let newUser = new UserModel({ email, pass });
            await newUser.save();
            res.status(200).send({ message: "Login successful" });
        } else {
            res.status(400).send({ message: "🤞 Invalid credentials" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

userRoute.post(
    "/signup",
    catchAsyncError(async (req, res, next) => {
        console.log(req.body);

        const { name, email, pass } = req.body;

        if (!email || !pass || !name) {
            return next(new ErrorHandler("Name, email, and password are required", 400));
        }

        let user = await UserModel.findOne({ email: email });
        if (user) {
            return next(new ErrorHandler("User already exists", 400));
        }

        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                return next(new ErrorHandler("Server error", 500));
            }

            let newUser = new UserModel({ name, email, pass: hash });

            let token = jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: "5h" }); // Fixed expiration time
            let PORT = process.env.PORT || 5000; 
            let activation_url = `http://localhost:${PORT}/user/activation/${token}`;

            try {
                await sendMail({
                    email: newUser.email,
                    subject: "Activate your account",
                    message: `Hello ${newUser.name}, please click the link to activate your account: ${activation_url}`,
                });

                await newUser.save();
                res.status(200).json({ status: true, message: "Registration successful" });
            } catch (error) {
                console.log(error);
                return next(new ErrorHandler("Internal server error", 500));
            }
        });
    })
);
userRoute.get("/activation/:token", async (req, res, next) => {
   
});


module.exports = { userRoute };
