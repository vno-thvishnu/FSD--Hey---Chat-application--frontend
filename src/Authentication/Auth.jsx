import React, { useState } from "react";
import "./Auth.css";
import Logo from "../img/logo2.png";
import { Outlet } from "react-router-dom";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (data.password !== data.confirmpassword) {
        setConfirmPass(false);
      }
    }
  };
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
    });
  };
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} />
        <div className="Webname">
          <h1>Hey!</h1>
          <h6>Talk now from anywhere</h6>
        </div>
      </div>
      <div className="form-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
