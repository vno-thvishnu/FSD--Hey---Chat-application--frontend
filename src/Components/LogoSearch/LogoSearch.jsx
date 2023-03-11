import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../img/logo2.png'
import {UilSearch} from '@iconscout/react-unicons'
import './LogoSearch.css'
import { UserContext } from '../../UseContext';
import { getUsers } from '../../api/ChatRequest';

function LogoSearch() {
  const { 
    setSearchUser

  } =
    useContext(UserContext);
    const[getAllUser,setGetAllUser]=useState([])

    useEffect(()=>{
      // setLoadingData(false)
  const gettingUsers=async()=>{
      try {
          const {data}=await getUsers()
          setGetAllUser(data)
      // setLoadingData(true)
  
          // console.log(data)
      } catch (error) {
          console.log(error)
      }
  }
  gettingUsers()
  },[])
  return (
    <div className="LogoSearch">

        <img src={Logo}/>
        <div className='Search'>
            <input list="data"
               name="text"
               className='searchInput'
            onChange={(e)=>setSearchUser(e.target.value)}
            placeholder='#Find Buddys'/>

<datalist id="data">
                          {getAllUser.map((get) => {
                            return (
                              <>
                                <option
                                  value={get.firstname.toLowerCase()}
                                ></option>
                              </>
                            );
                          })}
                        </datalist>
            <div className='s-icon'>
                <UilSearch  size={20} className="icons"/>
            </div>
        </div>

    </div>
  )
}

export default LogoSearch