import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUsernameJWT, getUserByEmail } from "../api/api";
import { selectUser, login as setUserData } from "../features/userSlice";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

function ChangeUsernameScreen() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const user = useSelector(selectUser); 

  React.useEffect(() => {
    async function getUser () {
      const db_user = await getUserByEmail(email, token);
      dispatch(
        setUserData({user_data: db_user.data.user})
      );      
    }
    getUser();
  }, [email, token, dispatch])
 


  const changeUsername = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;


    if (username) {
      if(token && email) {
        try {
          changeUsernameJWT(user.user_data.id, email, token, username);
          localStorage.setItem("alias", username)
          history("/home");
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
        <h2 className="font-bold text-gray-700 uppercase">New Username</h2>
        <form className="flex flex-col space-y-3">
          <input
            ref={usernameRef}
            className="border-2 rounded p-2"
            type="text"
            placeholder="Username"
            name="username"
          />
          <button
            className="rounded bg-gray-700 text-white p-2 hover:opacity-75"
            onClick={changeUsername}
          >
            Confirm Change
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangeUsernameScreen;
