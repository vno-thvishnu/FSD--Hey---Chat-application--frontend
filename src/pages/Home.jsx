import React, { useContext, useEffect, useState } from "react";
import { getUser } from "../api/ChatRequest";
import LogoSearch from "../Components/LogoSearch/LogoSearch";
import ProfileSide from "../Components/profile-side/ProfileSide";
import { UserContext } from "../UseContext";
import { SlLogout } from "react-icons/sl";
import Chat from "./Chat/Chat";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Logo from "../img/logo2.png";

const Home = () => {
  const { setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();

  const removeLocalstorgae = () => {
    navigate("/");

    localStorage.removeItem("ticket");
    localStorage.removeItem("key");
  };
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    setLoadingData(false);

    const refreshUser = async () => {
      try {
        const localId = localStorage.getItem("ticket");

        const get = await getUser(localId);

        setLoginUser(get.data.otherDetails);
        setLoadingData(true);
      } catch (error) {
        console.log(error);
      }
    };
    refreshUser();
  }, []);

  return (
    <>
      {loadingData ? (
        <>
          <div className="HomeParent">
            <div className="Navbar">
              <div className="logohide">
                <img src={Logo} />
                <div className="Webname">
                  <h1>Hey!</h1>
                  <h6>Talk now from anywhere</h6>
                </div>
              </div>
              <div className="navpair">
                <LogoSearch />
                <h3 onClick={removeLocalstorgae}>
                  LogOut <SlLogout />
                </h3>
              </div>
            </div>
            <div className="Home">
              <ProfileSide />

              <Chat />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {localStorage.ticket === undefined ? (
        <>
          <div className="securityerr">
            <div className="a-left">
              <img src={Logo} />
              <div className="Webname">
                <h1>Hey!</h1>
                <h6>Talk now from anywhere</h6>
              </div>
            </div>
            <h2
              onClick={() => {
                navigate("/");
              }}
            >
              Go Back, Login Again !
            </h2>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
