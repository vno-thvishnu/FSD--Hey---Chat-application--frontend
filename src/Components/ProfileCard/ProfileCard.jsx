import React, { useContext, useEffect, useState } from 'react'
import { getUser } from '../../api/ChatRequest';
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import dpic from '../../img/dprofile.png'
import dcover from '../../img/dcover.png'
import {MdOutlineTipsAndUpdates} from 'react-icons/md'
import { UserContext } from '../../UseContext';
import ProfileModal from '../Profile Modal/ProfileModal';
import './ProfileCard.css'
// import ProfileModal from '../Profile Modal/ProfileModal'
// import { Uilpen } from "@iconscout/react-unicons"

function ProfileCard() {

//  console.log(fake)
const { 
  loginUser
  // setLoginUser

} =
  useContext(UserContext);

  // const[loadingData,setLoadingData]=useState(false)
  const[modalOpen,setModalOpen]=useState(false)


// console.log(loginUser)
// 
    // console.log(loginUser.followers.length)
    // console.log(loginUser.following.length)

  return (

<>
{/* {loadingData?<> */}
  <div className='ProfileCard'>
        <div className="ProfileImages">
<img src={loginUser.coverImage===""?dcover:loginUser.coverImage} alt=""/>
<img src={loginUser.profileImage===""?dpic:loginUser.profileImage} alt=""/>


        </div>
        <div className='ProfileName'>
            <span>{loginUser.firstname} {loginUser.lastname}</span>
            {/* <span>Front end developer</span> */}
        </div>
        <div className="FollowStatus">
            <hr/>
            <div>
                <div className="Follow">
<span>{loginUser.following.length}</span>
<span>Followings</span>
                </div>
                <div className='vl'></div>
                <div className="Follow">
<span>{loginUser.followers.length}</span>
<span>Followers</span>
                </div>
            </div>
            <hr/>

        </div>
        <span className='edit' onClick={()=>{setModalOpen(true)}}>Update <MdOutlineTipsAndUpdates/></span>
<ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} loginUser={loginUser}/>
    </div>
{/* </>:""} */}
</>

  )
}

export default ProfileCard