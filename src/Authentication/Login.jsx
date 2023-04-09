import React, { useContext } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { login, loginUser } from "../api/ChatRequest";
function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      let error = {};

      if (values.username === "") {
        error.username = "please enter Email";
      }
      if (
        values.username &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.username)
      ) {
        error.username = " please enter a valid username";
      }
      if (values.password === "") {
        error.password = "please enter Password";
      }
      if (
        values.password &&
        (values.password.length <= 7 || values.password.length > 12)
      ) {
        error.password = "Password must be between 8 to 12 characters";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);

        const createAcc = await login(values);
        if (createAcc.data.message === "Login Successfully") {
          localStorage.setItem("ticket", createAcc.data.otherDetails._id);

          toast.success(createAcc.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => formik.resetForm(), 3000);
          setButtonLoading(false);

          setTimeout(() => navigate("/home"), 5000);

          formik.resetForm();
        } else if (
          createAcc.data.message === "Username or Password incorrect" ||
          "User does not exists"
        ) {
          toast.error(createAcc.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setButtonLoading(false);
        }
      } catch (error) {}
    },
  });
  const [passwordDispaly, setPasswordDisplay] = useState("Show");

  const [passwordType, setPasswordType] = useState("password");
  const changeType = () => {
    if (passwordType === "password") {
      setPasswordDisplay("Hide");
      setPasswordType("text");
    } else {
      setPasswordType("password");
      setPasswordDisplay("Show");
    }
  };

  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <>
      <div className="inputbg">
        <form className="inputform">
          <h3>Log In</h3>
          <div className="Inputpair">
            <input
              className="Input"
              type="username"
              placeholder="Email"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id={`
							${formik.touched.username && formik.errors.username ? "error-box" : ""}
							${formik.touched.username && !formik.errors.username ? "success-box" : ""}
   
							`}
            />
            {formik.touched.username && formik.errors.username ? (
              <span className="err">{formik.errors.username} </span>
            ) : null}
          </div>

          <div className="Inputpair">
            <div
              className="Input"
              id={`
							${formik.touched.password && formik.errors.password ? "error-box" : ""}
							${formik.touched.password && !formik.errors.password ? "success-box" : ""}

							`}
            >
              <input
                className="InputPassword"
                type={passwordType}
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="InputPasswordSpan" onClick={changeType}>
                {passwordDispaly}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <span className="err">{formik.errors.password} </span>
            ) : null}
          </div>
          <Link className="forlinks InputLink" to="signup">
            Don't have an account Sign up!
          </Link>
          
          <div className="fordisplayid">
            <p><span>Email Id : </span>person1@gmail.com</p>
            {/* <p><span>Person 2 : </span>person2@gmail.com</p>             */}
            </div>
            <div className="fordisplayid">
              <p><span>Password : </span>12345678</p>
            </div>
          <button
            onClick={formik.handleSubmit}
            type="submit"
            className="button InputButton"
          >
            {buttonLoading ? "Login" : "Login"}
          </button>

        </form>
      </div>

      <ToastContainer
        transition={Bounce}
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Login;
