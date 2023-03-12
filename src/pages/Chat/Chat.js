import React, { useContext, useEffect, useRef, useState } from 'react'
import { userChats } from '../../api/ChatRequest'
import ChatBox from '../../Components/ChatBox/ChatBox'
import Conversation from '../../Components/Conversation/Conversation'
import './Chat.css'
import {UilSearch} from '@iconscout/react-unicons'


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



useEffect(()=>{
    const getChats = async ()=>{
        try {
            const{data}=await userChats(loginUser._id)
            setChats(data)
        } catch (error) {
            
        }
    }
    getChats()
},[loginUser])


useEffect(()=>{
    // socket.current=io('http://localhost:5000')
    socket.current=io('https://hey-chat-application-backend.onrender.com')

    socket.current.emit('new-user-add',loginUser._id)
    socket.current.on('get-users',(users)=>{
        setOnlineUsers(users)
    })
},[loginUser])

//send message to socket server
useEffect(()=>{
    if(sendMessage!==null){
        socket.current.emit('send-message',sendMessage)
    }
},[sendMessage])




const[tryId,setTryId]=useState()
    const[tryBoolean,setTryBoolean]=useState(false)
    // const[recieveMessage,setRecieveMessage]=useState(null)


    const openChat =(id) =>{
        setTryId(id)

        if (id !== "") {
            chats.map((x) => { if (x._id === id) { setCurrentChat(x); setTryBoolean(true)}  })
        }
    }

//receive message from socket server
useEffect(()=>{
    socket.current.on("receive-message",(data)=>{
        // const dt = data.chatId
    //  setTryId(dt)
    //  setTryBoolean(true)

     setRecieveMessage(data)
    //  console.log(data)
    //  console.log(data.chatId)
    //  setTryId(recieveMessage.chatId)

    // openChat(dt)


    // try
    // const members=[data.senderId,data.receiverId]
    // setCurrentChat(members)
    })


 },[])
//  console.log(recieveMessage)
//  console.log(recieveMessage.ChatId)


//  function openChat(id) {
//         console.log(id)

//         if (id !== "") {
//             chats.map((x) => { if (x._id === id) { setCurrentChat(x); setTryBoolean(true)}  })
//         }
//     }
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


    <div className='Chat'>
        
        <div className='Left-side-chat'>
           <div className='Chat-container'>
           <h2>Chats</h2>
        <div className='Chat-list'>
        {chats.map((chat)=>{

            return(
            <div 
            onClick={()=>setCurrentChat(chat)}
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
     
        <ChatBox 
        // tryBoolean={tryBoolean} tryId={recieveMessage}
         chat={currentChat} currentUser={loginUser._id}
         setSendMessage={setSendMessage}
         recieveMessage={recieveMessage}/>
        </div>
            </div>
  </>
  )
}

export default Chat