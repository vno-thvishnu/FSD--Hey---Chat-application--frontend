import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import './Loading.css'
import '../src/Authentication/InputStyles.css'
import Auth from './Authentication/Auth';
import Login from './Authentication/Login';
import Chat from './pages/Chat/Chat';
import Home from './pages/Home';
import Signup from './Authentication/Signup';
import { UserContext } from './UseContext';
import { useContext, useEffect, useState } from 'react';
import { getUser } from './api/ChatRequest';
// import { UserProvider } from './UseContext';


function App() {
  // const navigate=useNavigate()
  console.log(localStorage.ticket)
  const { 
    loginUser,
    setLoginUser,
    // setOverAllCondition,
    // overAllCondition,

  } =
    useContext(UserContext);

    // const[overAllCondition,setOverAllCondition]=useState([])
    useEffect(()=>{
      // setOverAllCondition(false)
      // const check=localStorage.getItem(
      //   "key")
      //   setOverAllCondition(check)
      const refreshUser= async()=>{
        // console.log(getAllUser)
        try {
            // console.log("fun2")
            const localId=localStorage.getItem(
                "ticket")
        
            const get=await getUser(localId)
            // console.log(get)
            // gettingUsersAgain()
    
            setLoginUser(get.data.otherDetails)
            // setOverAllCondition(get.data.message)
        console.log(get.data)

            
        } catch (error) {
            console.log(error)
        }
        
        }
        refreshUser()
    },[])
    // console.log(overAllCondition)
   
  return (
    // <UserProvider>


    <div className="App">
       <div className='blur blurone'></div>
       <div className='blur blurtwo' ></div>
    {/* <Home/> */}
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Auth/>}>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

      </Route>
      {/* {localStorage.ticket!==undefined&& */}
      <Route path="/home" 

      element={<Home/>}
      
      //  element={localStorage.ticket==undefined?<Navigate to="/"/>:<Home/>} 
      
      />

    

      {/* // element={localStorage.ticket==undefined?<Navigate to="/"/>:<Home/>}   */}

      {/* // element={localStorage.getItem( */}
      {/* //   "ticket")===null&&<Navigate to="/"/> ||localStorage.getItem( */}
      {/* //     "ticket")!==undefined&&<Home/> }  */}
        
        
  
      {/* <Route path="/chat" element={<Chat/>}/> */}

    </Routes>
    </BrowserRouter>
    </div>
    // </UserProvider>

  );
}

export default App;
