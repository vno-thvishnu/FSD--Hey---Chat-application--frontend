import React, { useEffect, useRef, useState } from 'react'
import { addMesage, getMessages, getUser } from '../../api/ChatRequest'
import dpic from '../../img/dprofile.png'

import {format} from "timeago.js"
import InputEmoji from "react-input-emoji"
import "./ChatBox.css";


const ChatBox = ({chat,currentUser,setSendMessage,recieveMessage,
  // tryId,tryBoolean
}) => {
// const[currentChat,setCurrentChat]=useState(null)
// console.log(tryId)
// console.log(chat)
// console.log(tryBoolean)


// const [loading]
// console.log(recieveMessage)
const [userData, setUserData] = useState(null);
const[messages,setMessages] =useState([])
const[newMessage,setNewMessage] =useState("")
const scroll=useRef()

const handleChange=(newMessage)=>{
  setNewMessage(newMessage)
  }
  useEffect(()=>{
  
    const userId = chat?.members?.find((id)=>id!==currentUser)
    const getUserData =async()=>{
        try {
         const{data}=await getUser(userId)
         setUserData(data.otherDetails)

        } catch (error) {
         console.log(error)
        }
     }
    if(chat!==null) getUserData()
},[chat,currentUser,recieveMessage])




useEffect(()=>{
  const fetchMessage = async()=>{
      try{
          const {data}=await getMessages(chat._id)
          setMessages(data)
          // console.log(data)

      }catch (error) {
          console.log(error)
         }
  }
  if(chat!==null)fetchMessage()

},[chat,recieveMessage])

const fetchMessageAgain = async()=>{
  try{
      const {data}=await getMessages(chat._id)
      setMessages(data)
      // console.log(data)

  }catch (error) {
      console.log(error)
     }
}
//always scroll to last message
useEffect(()=>{
  scroll.current?.scrollIntoView({behavior:"smooth"})
},[messages])


const handleSend=async(e)=>{
  e.preventDefault()
  const message={
    senderId:currentUser,
    text:newMessage,
    chatId:chat._id
  }
  const receiverId = chat.members.find((id)=>id!==currentUser)
  setSendMessage({...message,receiverId})

try {
  const {data }=await addMesage(message)
  fetchMessageAgain()

  setMessages([...messages,data])
  setNewMessage("")
} catch (error) {
  console.log(error)
}




}


useEffect(()=>{
if(recieveMessage !== null
  //  && recieveMessage.chatId ===(chat._id 
  // || tryId
  // )
  ){

// if(recieveMessage !== null && recieveMessage.chatId === tryId){
  setMessages([...messages,recieveMessage])
}
},[recieveMessage])












// console.log(userData)


  return (
<>
<div className='ChatBox-container'>
    {chat 
    // || tryBoolean
    ?(
  <>
  <div className='chat-header'>
      <div className='follower'>
          <div>
          <img src={userData===null || userData.profileImage==="" ?dpic:userData.profileImage} className="followerImage"
                // style={{width:"50px",height:"50px"}}
                />


          </div>
          <div className="nametwo" >
                  <span className='spanone'>{userData?.firstname} {userData?.lastname}</span>
                  </div>
      </div>
  <hr style={{width:"100%",border:"0.1px solid #ececec"}}/>

  </div>
  <div className='chat-body'>
  {messages.map((message) => (
              <>
                <div ref={scroll}
                  className={
                    message.senderId === currentUser
                      ? "message own"
                      : "message"
                  }
                >
                  <span>{message.text}</span>{" "}
                  <span>{format(message.createdAt)}</span>
                </div>


              </>
            ))}

  </div>

  {/* chat-sender */}
  <div className="chat-sender">
      <div>+</div>
      <InputEmoji
      value={newMessage}
      onChange={handleChange}
      // height={40}
      />
      <div className='send-button button' onClick={handleSend}>Send</div>
  </div>
  </>
    ):(
       <>
     
        <span className='chatbox-empty-message'>
            Tap on a Chat to start Conversation...</span>
       </>
    )}
  

</div>
</>  )
}

export default ChatBox