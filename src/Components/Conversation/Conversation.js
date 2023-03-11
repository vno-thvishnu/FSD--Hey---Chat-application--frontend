import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/ChatRequest'
import imgone from '../../img/img1.png'
import Profile from '../../img/profileImg.jpg'
import dpic from '../../img/dprofile.png'

import { useContext } from "react";
import { UserContext } from "../../UseContext";


const Conversation = ({data,currentUser,online}) => {

const { 
    loginUser } =
    useContext(UserContext);

    const[userData,setUserData]=useState([])

    useEffect(()=>{
        const userId = data.members.find((id)=>id!==currentUser)
        const getUserData =async()=>{
           try {
            const{data}=await getUser(userId)
            setUserData(data.otherDetails)
            console.log(data)
           } catch (error) {
            console.log(error)
           }
        }
        getUserData()
    },[])
  return (
<>
<div className='follower conversation'>
        <div>
           {online &&  <div className="online-dot"> 
            </div>}

                  <img src={userData.profileImage===""?dpic:userData.profileImage} className="followerImagetwo"
                  // style={{width:"50px",height:"50px"}}
                  // className={imgmsg}
                  />
                  </div>

                  <div className="nametwo" 
                  // style={{fontSize:"0.8rem"}}
                  >
                    <span className='spanone'>{userData?.firstname} {userData?.lastname}</span>
                    {/* <span>vinoth vishnu</span> */}

                    <span>{online?"Online":"offline"}</span>
        </div>
    </div>
    <hr style={{width:"85%",border:"0.1px solid #ececec"}}/>
</>
  )
}

export default Conversation