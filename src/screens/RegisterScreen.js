import React, { useRef } from "react";
import { signup } from "../api/api";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

function RegisterScreen() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await signup(username, email, password);

    if (response) {
      alert(`USER CREATED: ${username}`);
      history("/")
    }
  };

  return (
    <div>
      {/*Signup Nav */}
      <Nav />

      {/* Signup Form Input */}
      <div className="h-[355px] w-[350px] mx-auto mt-[100px] border-2 p-10 space-y-2 rounded shadow">
        <h2 className="font-bold text-gray-700 uppercase">Register</h2>
        <form onSubmit={register} className="flex flex-col space-y-3">
          <input
            ref={usernameRef}
            className="border-2 rounded p-2"
            type="text"
            placeholder="Username"
            autoComplete="username"
            name="username"
          />
          <input
            ref={emailRef}
            className="border-2 rounded p-2"
            type="email"
            placeholder="Email"
            autoComplete="email"
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
            Register
          </button>
        </form> 
        <div className="py-2 text-center">
          <a href="/" className="text-gray-700 hover:opacity-75 underline">Sign In</a>
        </div>      
      </div>
    </div>
  );
}

export default RegisterScreen;
