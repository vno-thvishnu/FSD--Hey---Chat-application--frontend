import React, { useContext, useEffect, useState } from "react";
import "./FollowersCard.css";
import dpic from "../../img/dprofile.png";
import {
  functionFollow,
  functionUnFollow,
  getUser,
  getUsers,
} from "../../api/ChatRequest";
import { UserContext } from "../../UseContext";

const FollowersCard = () => {
  const { loginUser, setLoginUser, searchUser } = useContext(UserContext);
  const [getAllUser, setGetAllUser] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    setLoadingData(false);
    const gettingUsers = async () => {
      try {
        const { data } = await getUsers();
        setGetAllUser(data);
        setLoadingData(true);
      } catch (error) {
        console.log(error);
      }
    };
    gettingUsers();
  }, []);

  const follow = async (id, loginUser) => {
    try {
      const data = await functionFollow(id, loginUser);

      refreshUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const gettingUsersAgain = async () => {
      try {
        const { data } = await getUsers();
        setGetAllUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    gettingUsersAgain();
  }, [loginUser]);

  const refreshUser = async () => {
    try {
      const localId = localStorage.getItem("ticket");

      const get = await getUser(localId);

      setLoginUser(get.data.otherDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const Unfollow = async (id, loginUser) => {
    try {
      const data = await functionUnFollow(id, loginUser);

      refreshUser(loginUser);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="FollowersCard">
      <h3>Available User in Hey!</h3>
      {loadingData ? (
        <>
          {getAllUser
            .filter((p) =>
              p.firstname.toString().toLowerCase().includes(searchUser)
            )
            .map((get) => {
              return (
                <>
                  {loginUser._id !== get._id ? (
                    <div className="Followers">
                      <div>
                        <img
                          className="followerImage"
                          src={
                            get.profileImage === "" ? dpic : get.profileImage
                          }
                        />
                        <div className="name">
                          <span>{get.firstname}</span>
                          <span className="nameemail">{get.username}</span>
                        </div>
                      </div>
                      {loginUser.following.length !== 0 && (
                        <>
                          {loginUser.following.some((e) => {
                            return e === get._id;
                          }) ? (
                            <button
                              className="button fc-button"
                              onClick={() => Unfollow(get._id, loginUser)}
                            >
                              UnFollow
                            </button>
                          ) : (
                            <button
                              className="button fc-button"
                              onClick={() => follow(get._id, loginUser)}
                            >
                              Follow
                            </button>
                          )}
                        </>
                      )}

                      {loginUser.following.length === 0 && (
                        <button
                          className="button fc-button"
                          onClick={() => follow(get._id, loginUser)}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default FollowersCard;
