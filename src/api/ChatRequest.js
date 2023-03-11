import axios from "axios";
// import { useContext } from "react";
// import { UserContext } from "../UseContext";
// const { 
//     loginUser

//   } =
//     useContext(UserContext);


const API = axios.create({baseURL:'http://localhost:5000'})

export const login=(values)=>API.post(`/auth/login`,values)
export const registerUser=(values)=>API.post(`/auth/register`,values)

export const getUsers=()=>API.get('/user')

export const functionFollow=(id,loginUser)=>{
    const data={
        "currentUserId":`${loginUser._id}`}
    API.put(`/user/${id}/follow`,data)
    const datatwo={
        "senderId":`${loginUser._id}`,
        "receiverId":`${id}`
    }
    API.post("/chat/",datatwo)

}

    export const functionUnFollow=(id,loginUser)=>{
        const data={
            "currentUserId":`${loginUser._id}`}
        API.put(`/user/${id}/unfollow`,data)}

        //  const loginBy=(id)=> API.get(`/chat/${id}`)





export const userChats=(id)=>API.get(`/chat/${id}`)

export const getUser=(userId)=>API.get(`/user/${userId}`)

export const removeImage=(userId,sendData)=> API.put(`/user/removeimg/${userId}`,sendData)

export const UpdateUser=(userId,UpdateData)=>API.put(`/user/${userId}`,UpdateData)


export const getMessages=(id)=>API.get(`/message/${id}`)

export const addMesage=(data)=>API.post('/message/',data)
