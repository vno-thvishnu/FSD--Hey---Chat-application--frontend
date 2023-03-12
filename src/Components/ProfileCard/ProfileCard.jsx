import React, { useContext, useEffect, useState } from "react";
import dpic from "../../img/dprofile.png";
import dcover from "../../img/dcover.png";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { UserContext } from "../../UseContext";
import ProfileModal from "../Profile Modal/ProfileModal";
import "./ProfileCard.css";

function ProfileCard() {
  const { loginUser } = useContext(UserContext);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="ProfileCard">
        <div className="ProfileImages">
          <img
            src={loginUser.coverImage === "" ? dcover : loginUser.coverImage}
            alt=""
          />
          <img
            src={loginUser.profileImage === "" ? dpic : loginUser.profileImage}
            alt=""
          />
        </div>
        <div className="ProfileName">
          <span>
            {loginUser.firstname} {loginUser.lastname}
          </span>
        </div>
        <div className="FollowStatus">
          <hr />
          <div>
            <div className="Follow">
              <span>{loginUser.following.length}</span>
              <span>Followings</span>
            </div>
            <div className="vl"></div>
            <div className="Follow">
              <span>{loginUser.followers.length}</span>
              <span>Followers</span>
            </div>
          </div>
          <hr />
        </div>
        <span
          className="edit"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Update <MdOutlineTipsAndUpdates />
        </span>
        <ProfileModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          loginUser={loginUser}
        />
      </div>
    </>
  );
}

export default ProfileCard;
