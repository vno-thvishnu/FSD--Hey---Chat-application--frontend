import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { config } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { registerUser } from "../api/ChatRequest";

// import styles from "./Signup.module.scss";

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
      profileImage: "",
      coverImage: "",
  profileImage_publicId:"",
  coverImage_publicId:"",

      // otp: "",
    },
    validate: (values) => {
      let error = {};

      if (values.firstname === "") {
        error.firstname = "please enter First name";
      }
      if (values.firstname && (values.firstname.length <= 2 || values.firstname.length > 15)) {
        error.firstname = "Name must be between 3 to 15 characters";
      }
      if (values.lastname === "") {
        error.lastname = "please enter Last name";
      }
      if (values.lastname && (values.lastname.length < 0 || values.lastname.length > 15)) {
        error.lastname = "Name must be between 3 to 15 characters";
      }
      if (values.username === "") {
        error.username = "please enter Email";
      }
      if (
        values.username &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.username)
      ) {
        error.username = " please enter a valid Email";
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
      if (values.confirmpassword === "") {
        error.confirmpassword = "please enter Password again";
      }
      if (
        values.confirmpassword &&
        (values.confirmpassword.length <= 7 ||
          values.confirmpassword.length > 12)
      ) {
        error.confirmpassword = "Password must be between 8 to 12 characters";
      }

      if (
        values.password.length > 7 &&
        values.confirmpassword.length > 7 &&
        values.password.length < 13 &&
        values.confirmpassword.length < 13 &&
        values.password !== values.confirmpassword
      ) {
        error.confirmpassword = "Password not matching";

        error.password = "Password not matching";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);
        const createAcc = await  registerUser(values);
        console.log(createAcc)

        if (createAcc.data.message === "Registered Successfully") {
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

          setTimeout(() => navigate("/"), 5500);
        }else if (
          createAcc.data.message === "Email-id or Firstname already in use" ||
          "Email-id already in use" || "Firstname already in use"
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
      } catch (error) {
        alert("error");
      }
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

  const [passwordDispalyTwo, setPasswordDisplayTwo] = useState("Show");

  const [passwordTypeTwo, setPasswordTypeTwo] = useState("password");
  const changeTypeTwo = () => {
    if (passwordTypeTwo === "password") {
      setPasswordDisplayTwo("Hide");
      setPasswordTypeTwo("text");
    } else {
      setPasswordTypeTwo("password");
      setPasswordDisplayTwo("Show");
    }
  };
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <>
      <div className='inputbg'>
        <form  className='inputform'  >
          <h3>Sign Up</h3>
{/* <div className="doubleInput"> */}
<div className="Inputpair" >

<input
  className='Input'
  type="text"
  placeholder="First Name"
name="firstname"
  value={formik.values.firstname}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  id={`
                  ${formik.touched.firstname && formik.errors.firstname ? "error-box" : ""}
                  ${formik.touched.firstname && !formik.errors.firstname ? "success-box" : ""}

                  `}
/>
{formik.touched.firstname && formik.errors.firstname ? (
  <span className="err">{formik.errors.firstname} </span>
) : null}
</div>
          <div className="Inputpair" >

          <input
            className='Input'
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id={`
							${formik.touched.lastname && formik.errors.lastname ? "error-box" : ""}
							${formik.touched.lastname && !formik.errors.lastname ? "success-box" : ""}

							`}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <span className="err">{formik.errors.lastname} </span>
          ) : null}
</div>
{/* </div> */}

<div className="Inputpair" >

          <input
           className='InputBig' 
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

{/* <div className="doubleInput"> */}
          <div className="Inputpair" >

          <div
              className='Input' 

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
            <span onClick={changeType} className="InputPasswordSpan" >
              {passwordDispaly}
            </span>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <span className="err">{formik.errors.password} </span>
          ) : null}
          </div>
          <div className="Inputpair" >

          <div
              className='Input' 

            id={`
							${
                formik.touched.confirmpassword && formik.errors.confirmpassword
                  ? "error-box"
                  : ""
              }
							${
                formik.touched.confirmpassword && !formik.errors.confirmpassword
                  ? "success-box"
                  : ""
              }

							`}
          >
            <input
              className="InputPassword"

              type={passwordTypeTwo}
              placeholder="Confirm Password"
              name="confirmpassword"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span onClick={changeTypeTwo} className="InputPasswordSpan" >
              {passwordDispalyTwo}
            </span>
          </div>
          {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
            <span className="err">{formik.errors.confirmpassword} </span>
          ) : null}
          </div>
{/* </div> */}

          <Link className="forlinks InputLink" to="/" >
          Already have an account. Login!
      </Link>
          <button
            onClick={formik.handleSubmit}
            type="submit"
            className="button InputButton"

          >
            {buttonLoading ? (
              "Create"
              
            ) : (
              "Create"
            )}
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

export default Signup;
