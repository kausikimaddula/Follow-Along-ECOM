import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

let url = "http://localhost:6758/user/signup";
import axios from "axios"

function Signup(props) {
  let [hidePassword, setHidePassword] = useState(true);
  let [hideConfirmPassword, setHideConfirmPassword] = useState(true);
   let [err,setErr]=useState("")

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleHideConfirmPassword = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  const [data, setData] = useState({
    username: "", // Added username field
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data); // Will log the data as the state is updated
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    const { username, email, password, confirmPassword } = data;

    if (!username || !email || !password || !confirmPassword) {
      setErr("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErr("Passwords do not match.");
      return;
    }

    try {
      await axios.post(url, data)
       .then((response) => {
          console.log(response);
        })
    } catch (error) {
      setErr(error.message)
      console.log(error);
    }

   
     

    // Reset the form data after submission
    setData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

     
  };

  return (
    <>
      <div className="border-2 w-[650px] ">
        <h1 className="text-3xl font-bold text-center">CREATE AN ACCOUNT</h1>

        <div className="w-7/10 h-85 m-auto mt-10 mb-10 shadow-lg h-100">
          {/* Username input */}
          <label htmlFor="username" className="block ml-10 mt-10">
            Username
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="border-1 w-8/10 block m-auto h-8 rounded-md"
            name="username"
            value={data.username}
          />

          {/* Email input */}
          <label htmlFor="email" className="block ml-10 mt-5">
            Email address
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="border-1 w-8/10 block m-auto h-8 rounded-md"
            name="email"
            value={data.email}
          />

          {/* Password input */}
          <label htmlFor="password" className="block ml-10 mt-5">
            Password
          </label>
          <div className="flex w-8/10 m-auto">
            <input
              onChange={handleChange}
              name="password"
              type={hidePassword ? "password" : "text"}
              className="border-1 w-[88%] block m-auto h-8 rounded-tl-md rounded-bl-md"
              value={data.password}
            />

            {hidePassword ? (
              <FaRegEye
                className="border-1 h-8 ml-0 mr-5 w-6"
                onClick={handleHidePassword}
              />
            ) : (
              <FaRegEyeSlash
                className="border-1 h-8 ml-0 mr-5 w-6"
                onClick={handleHidePassword}
              />
            )}
          </div>

          {/* Confirm Password input */}
          <label htmlFor="confirmPassword" className="block ml-10 mt-5">
            Confirm Password
          </label>
          <div className="flex w-8/10 m-auto">
            <input
              onChange={handleChange}
              name="confirmPassword" // Correct name reference
              type={hideConfirmPassword ? "password" : "text"}
              className="border-1 w-[88%] block m-auto h-8 rounded-tl-md rounded-bl-md"
              value={data.confirmPassword}
            />

            {hideConfirmPassword ? (
              <FaRegEye
                className="border-1 h-8 ml-0 mr-5 w-6"
                onClick={handleHideConfirmPassword}
              />
            ) : (
              <FaRegEyeSlash
                className="border-1 h-8 ml-0 mr-5 w-6"
                onClick={handleHideConfirmPassword}
              />
            )}
          </div>

          {/* Already a user text */}
          <div>
            <p onClick={props.x} className="ml-10">Already a User?</p>
          </div>

          {/* Submit button */}
          <p className="text-red-500">{err}</p>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-8/10 block m-auto bg-blue-500 rounded-m mt-5 h-8 rounded-md"
          >
            <p className="text-xl font-bold text-white">Signup</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;