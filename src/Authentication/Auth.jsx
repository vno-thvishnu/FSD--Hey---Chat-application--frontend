import React, { useState } from 'react'
import './Auth.css'
import Logo from '../img/logo2.png'
import { Outlet } from 'react-router-dom'

const Auth = () => {

const[isSignUp,setIsSignUp]=useState(false)


const[data,setData]=useState({firstname:"",lastname:"",username:"",password:"",
confirmpassword:""})

const[confirmPass,setConfirmPass]=useState(true)

const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
}
const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSignUp){
        if(data.password !== data.confirmpassword){
            setConfirmPass(false)
        }
    }
}
const resetForm=()=>{
    setConfirmPass(true)
    setData({
        firstname:"",lastname:"",username:"",password:"",
confirmpassword:""
    })
}
  return (
    <div className='Auth'>
<div className='a-left'>
    <img src={Logo} />
    <div className='Webname'>
        <h1>Hey!</h1>
        <h6>Talk now from anywhere</h6>
    </div>
</div>
<div className='form-container'>
<Outlet/>

{/* <div className='a-right'>
            <form className='infoForm authForm' onSubmit={handleSubmit}>

                <h3>{isSignUp? "Sign Up":"Log In"}</h3>
                {isSignUp &&
                <div>
                <input type="text" placeholder='First Name'
                className='infoInput' name="firstname"
                onChange={handleChange}   value={data.firstname}/>
                 <input type="text" placeholder='Last Name'
                className='infoInput' name="lastname"onChange={handleChange} 
                value={data.lastname} />
            </div>
                }
                <div>
                    <input type="text" className="infoInput" name='username'
                    placeholder='User Name' onChange={handleChange}  value={data.username}  />
                </div>
                <div>
                    <input type="text" className='infoInput' name="password"
                    placeholder='Password' onChange={handleChange}  value={data.password} />
                     {isSignUp && 
                      <input type="text" className='infoInput' name="confirmpassword"
                      placeholder='Confirm Password'  value={data.confirmpassword}
                      onChange={handleChange} />
                     }
                </div>
<span style={{display:confirmPass?"none":"block" ,color:"red",fontSize:"12px",alignSelf:"flex-end" }}>* Password not Matching</span>

                <div>
                    <span style={{fontSize:"12px",cursor:"pointer"}}
                    onClick={()=>{setIsSignUp((prev)=>!prev);resetForm()}}
                    >{isSignUp? "Already have an account. Login!":
                    "Don't have an account Sign up"}</span>
                </div>
                <button className="button infoButton" type='Submit'>{isSignUp? "Signup":"Login"}</button>
            </form>
        </div> */}
</div>
    </div>
  )
}


// function LogIn(){
//     return(
//         <div className='a-right'>
//             <form className='infoForm authForm'>

//                 <h3>Log Up</h3>
              
//                 <div>
//                     <input type="text" className="infoInput" name='username'
//                     placeholder='User Name' />
//                 </div>
//                 <div>
//                     <input type="text" className='infoInput' name="password"
//                     placeholder='password' />
                    
//                 </div>
//                 <div>
//                     <span style={{fontSize:"12px"}}>Don't have an account Sign up</span>
//                 <button className="button infoButton" type='submit'>Signup</button>

//                 </div>
//             </form>
//         </div>
//     )
// }


// function SignUp(){
//     return(
//         <div className='a-right'>
//             <form className='infoForm authForm'>

//                 <h3>Sign Up</h3>
//                 <div>
//                     <input type="text" placeholder='First Name'
//                     className='infoInput' name="firstname"/>
//                      <input type="text" placeholder='Last Name'
//                     className='infoInput' name="lastname"/>
//                 </div>
//                 <div>
//                     <input type="text" className="infoInput" name='username'
//                     placeholder='User Name' />
//                 </div>
//                 <div>
//                     <input type="text" className='infoInput' name="password"
//                     placeholder='password' />
//                       <input type="text" className='infoInput' name="password"
//                     placeholder='password' />
//                 </div>
//                 <div>
//                     <span style={{fontSize:"12px"}}>Already have an account. Login!</span>
//                 </div>
//                 <button className="button infoButton" type='submit'>Signup</button>
//             </form>
//         </div>
//     )
// }

export default Auth