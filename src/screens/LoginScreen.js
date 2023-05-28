import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../api/api";
import { login as access } from "../features/userSlice";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useNavigate();
  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault();
    try {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Call the login function with the username and password
    const response = await signin(`${email}`, `${password}`);
    const token = response.data.userdata.token;
    const alias = response.data.userdata.user.username;
    const user_data = response.data.userdata.user;
    if (token) {      
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      localStorage.setItem("alias", alias);
      
      dispatch(
        access({
          token: token,
          user_data: user_data,
        })
      );

      history("/home");

    }
  } catch (error) {console.error(error)}

  };

 
  
  return (
    <div>
      {/*Signin Nav */}
      <Nav />

      {/* Signin Form Input */}
      <div className="h-[300px] w-[350px] mx-auto mt-[100px] border-2 p-10 space-y-2 rounded shadow">
        <h2 className="font-bold text-gray-700 uppercase">Sign In</h2>
        <form onSubmit={login} className="flex flex-col space-y-3">
          <input
            ref={emailRef}
            className="border-2 rounded p-2"
            type="email"
            placeholder="Email"
            autoComplete="current-email"
            name="email"
          />
          <input
            ref={passwordRef}
            className="border-2 rounded p-2"
            type="password"
            placeholder="Password"
            autoComplete="password"
            name="password"
          />
          <button
            className="rounded bg-gray-700 text-white p-2 hover:opacity-75"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <div className="py-2 text-center">
          <a href="/register" className="text-gray-700 hover:opacity-75 underline">Register</a>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
