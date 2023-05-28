import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ChangeUsernameScreen from "./screens/ChangeUsernameScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";

function App() {
  const user_email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const user = useSelector(selectUser);
 

  useEffect(() => {
    document.title = "TrackMyCash";
  }, []);

  return (
    <div className="">
      <Router>
        <Routes>
          {user || (user_email && token)  ? (
            <Route path="/home" element={<HomeScreen />} />            
          ) : (
            <Route exact path="/" element={<LoginScreen />} />
          )}          
          {(user || (user_email && token)) && (
            <Route path="/change_username" element={<ChangeUsernameScreen />} />
          )}          
          {(user || (user_email && token)) && (
            <Route path="/change_password" element={<ChangePasswordScreen />} />
            
          )}          
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
