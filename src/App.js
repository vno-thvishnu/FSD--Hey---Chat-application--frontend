import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import "./Loading.css";
import "../src/Authentication/InputStyles.css";
import Auth from "./Authentication/Auth";
import Login from "./Authentication/Login";
import Home from "./pages/Home";
import Signup from "./Authentication/Signup";
import { UserContext } from "./UseContext";
import { useContext, useEffect, useState } from "react";
import { getUser } from "./api/ChatRequest";

function App() {
  const { loginUser, setLoginUser } = useContext(UserContext);

  useEffect(() => {
    const refreshUser = async () => {
      try {
        const localId = localStorage.getItem("ticket");

        const get = await getUser(localId);

        setLoginUser(get.data.otherDetails);
      } catch (error) {
        console.log(error);
      }
    };
    refreshUser();
  }, []);

  return (
    <div className="App">
      <div className="blur blurone"></div>
      <div className="blur blurtwo"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
