import React, { useState,useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Link ,Navigate, useNavigate} from 'react-router-dom'
import './log.css'
import { IoPersonCircleOutline } from "react-icons/io5";
import Logo from './../../images/logo.png'
import axios from 'axios';


export default function Login() {
  const [bk,setBk]=useState('#004D40');
  const [email,setEmail]=useState("dfdd")
  const [password,setPassword]=useState("fdfdfd")
  const validate =()=>{

    
   /* if(email.length>0 &&email.includes('@')&&email.includes('.')){
      if(password.length<6){
        alert("password should be greater than 6")
      }
      else{
        alert("loged in")
      }
    }
    else{
      alert("Enter valid Email")
    }
    //
    */

    
  }
  const history=useNavigate();
  async function submit(){
   
    try{
      await axios.post("http://localhost:3000/",{
        email,password
      }).then((res)=>{
        if(res.data=='exists'){
          history('/Home')
        }
        else if(res.data=="notexists"){
          alert('Email/password incorrect');
        }
      }).catch((err)=>{
        console.log('somme error')
      })
    }
    catch(err){
      console.log(err);
    }
  }
// stay loged in
const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Retrieve token from storage
  // Check if the token exists and is not expired
  return token 
  //&& !isTokenExpired(token);
};

useEffect(() => {
  // Check if the user is authenticated on component mount
  if (isAuthenticated()) {
    // Redirect to home page if already logged in
    history('/Home'); // useNavigate() hook for navigation
  }
}, [history]); 

  return (
    <div className='top'>
    <div className='main'  >
       <div className='left'>
       <img src={Logo} className='logo'/>
       <div><IoPersonCircleOutline className='icon'/></div>
       <input className='input'  type='email' placeholder='EMail' onChange={e=>setEmail(e.target.value)} /><br></br>
       <input  className='input' type='password' placeholder='Password' onChange={e=>setPassword(e.target.value)}/><br></br>
          <button  style={{color:'#1DE9B6',fontSize:'2rem',textDecoration:'none',border:'none'}} onClick={submit}>login</button>
       </div>
       <div className='right' style={{background:bk}}> 
       <div>
       <h1>Welcome to ETracker</h1>
       <h2> Your Daily Expense Companion!</h2>
       <h3> ETracker is thrilled to help you manage your daily spending."</h3>
       <h4>New to eTracker? Create an account to effortlessly monitor and manage your daily expenses.</h4>
       <h4>Explore the world of eTracker. Log in to continue tracking or sign up for personalized expense insights.</h4>
       <h4>Unlock financial peace of mind. Sign up for eTracker's tailored expense tracking solutions.</h4>
       </div>
      
       <Link to='/Signup' style={{color:'#1DE9B6',fontSize:'2rem',textDecoration:'none'}}>signup</Link>
       </div>
    </div>
    </div>
  )
}
