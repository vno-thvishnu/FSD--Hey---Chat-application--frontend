import React, { useEffect, useState } from "react";
import { getUser } from "../../api/ChatRequest";
import dpic from "../../img/dprofile.png";

import { useContext } from "react";
import { UserContext } from "../../UseContext";

const Conversation = ({ data, currentUser, online }) => {
  const { loginUser } = useContext(UserContext);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data.otherDetails);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}

          <img
            src={userData.profileImage === "" ? dpic : userData.profileImage}
            className="followerImagetwo"
          />
        </div>

        <div className="nametwo">
          <span className="spanone">
            {userData?.firstname} {userData?.lastname}
          </span>

          <span>{online ? "Online" : "offline"}</span>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
