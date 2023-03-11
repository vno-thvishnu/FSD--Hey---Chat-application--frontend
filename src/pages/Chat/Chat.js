import React, { useContext, useEffect, useRef, useState } from 'react'
import { userChats } from '../../api/ChatRequest'
import ChatBox from '../../Components/ChatBox/ChatBox'
import Conversation from '../../Components/Conversation/Conversation'
import LogoSearch from '../../Components/LogoSearch/LogoSearch'
import './Chat.css'
import {UilSearch} from '@iconscout/react-unicons'
import Logo from '../../img/logo.png'


import { io } from 'socket.io-client'
import { UserContext } from '../../UseContext'


const Chat = () => {

    const { 
    loginUser

  } =
    useContext(UserContext);

const [chats,setChats]=useState([])
const [onlineUsers,setOnlineUsers]=useState([])

const[currentChat,setCurrentChat]=useState(null)
const[sendMessage,setSendMessage]=useState(null)
const[recieveMessage,setRecieveMessage]=useState(null)

const socket=useRef()

// const manualId="6400f86623e61fee2f73fe12"
// const manualId ="6400f87223e61fee2f73fe14"

useEffect(()=>{
    const getChats = async ()=>{
        try {
            const{data}=await userChats(loginUser._id)
            setChats(data)
            console.log(data)
        } catch (error) {
            
        }
    }
    getChats()
},[loginUser])


useEffect(()=>{
    socket.current=io('http://localhost:8800')
    socket.current.emit('new-user-add',loginUser._id)
    socket.current.on('get-users',(users)=>{
        setOnlineUsers(users)
        // console.log(onlineUsers)
    })
},[loginUser])

//send message to socket server
useEffect(()=>{
    if(sendMessage!==null){
        socket.current.emit('send-message',sendMessage)
    }
},[sendMessage])




const[tryId,setTryId]=useState({})
    const[tryBoolean,setTryBoolean]=useState(false)
    // const[recieveMessage,setRecieveMessage]=useState(null)

//receive message from socket server
useEffect(()=>{
    socket.current.on("receive-message",(data)=>{
     setTryId(data.chatId)
     setTryBoolean(true)

     setRecieveMessage(data)
     console.log(data)
     console.log(data.chatId)
    //  setTryId(recieveMessage.chatId)

    openChat()


    // try
    // const members=[data.senderId,data.receiverId]
    // setCurrentChat(members)
    })


 },[])
 console.log(recieveMessage)
//  console.log(recieveMessage.ChatId)


 function openChat() {
        console.log(tryId)

        if (tryId !== "") {
            chats.map((x) => { if (x._id === tryId) { setCurrentChat(x); setTryBoolean(true)}  })
        }
    }
// const openChat=(chat)=>{
//     if(tryId===""){
//         setCurrentChat(chat)
//     console.log("jlo")

//     }
//     else(
//      console.log(tryId)

//                 // console.log(chat)


//         // chats.map((get)=>{
//         //     if(get._id===tryId){
//         //         console.log("lll")
//         //         setCurrentChat(get)
//         //         setTryBoolean(true)
    
//         //     }
//         // }
        
//     // )
//     )

 

//  }





const checkOnlineStatus=(chat)=>{
    const chatMember = chat.members.find((member)=>member!==loginUser._id)
    const online = onlineUsers.find((user)=>user.userId===chatMember)
    return online?true:false
}

  return (
  <>

  {/* <div className='LogoSearchtwo'>
  <img src={Logo}/>
  
  <div className='Search'>
            <input type="text" placeholder='#Find Buddys'/>
            <div className='s-icon'>
                <UilSearch/>
            </div>
        </div>
  </div> */}
    <div className='Chat'>
        
        <div className='Left-side-chat'>
            {/* <LogoSearch/> */}
           <div className='Chat-container'>
           <h2>Chats</h2>
        <div className='Chat-list'>
        {chats.map((chat)=>{
// if(chat._id===tryId){
// setTryBoolean(chat)
// }
            return(
            <div 
            onClick={()=>setCurrentChat(chat)}
// onClick={()=>{openChat(chat)}}
>
                <Conversation  data={chat} currentUser={loginUser._id}
                online={checkOnlineStatus(chat)}/>
                </div>
            )
            })}
        </div>
           </div>
        
        
        </div>
        
        
        <div className='Right-side-chat'>
        {/* <div style={{width:"20rem" , alignSelf:"flex-end"}}> */}
        {/* <span>Hloo</span> */}
        {/* </div> */}
        <ChatBox tryBoolean={tryBoolean} tryId={recieveMessage} chat={currentChat} currentUser={loginUser._id}
         setSendMessage={setSendMessage}
         recieveMessage={recieveMessage}/>
        </div>
            </div>
  </>
  )
}

export default Chat