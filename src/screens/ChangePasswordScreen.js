import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordJWT, getUserByEmail, signoutJWT } from "../api/api";
import { selectUser, login as setUserData, logout } from "../features/userSlice";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

function ChangePasswordScreen() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const user = useSelector(selectUser);  
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const alias = localStorage.getItem("alias");

  React.useEffect(() => {
    async function getUser () {
      const db_user = await getUserByEmail(email, token);
      dispatch(
        setUserData({user_data: db_user.data.user})
      );      
    }
    getUser();
  }, [email, token, dispatch])

  const changePassword = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;    
  
      if (password) {
        if(token && email) {
          try {
            const newPassword = changePasswordJWT(user.user_data.id, email, token, password);
            if (newPassword) {
              alert(`${alias}'s password has changed`);
              signoutJWT(email, token);
              localStorage.clear();
              dispatch(logout());
              history("/");
            }
          } catch (error) {
            console.error(error);
          }      
        } else {
          history("/");
        }
      }
  };

  return (
    <div>
      {/*Signin Nav */}
      <Nav />

      {/* Signin Form Input */}
      <div className="h-auto w-[500px] mx-auto mt-[100px] border-2 p-10 space-y-2 rounded shadow">
        <h2 className="font-bold text-gray-700 uppercase">New Password</h2>
        <form className="flex flex-col space-y-3">
          <input
            ref={passwordRef}
            className="border-2 rounded p-2"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button
            className="rounded bg-gray-700 text-white p-2 hover:opacity-75"
            onClick={changePassword}
          >
            Confirm change
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordScreen;
