import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './signup.css'
import { IoPersonCircleOutline } from "react-icons/io5";
import Logo from './../../../images/logo.png'
import axios from 'axios';

export default function Signup() {
  const [bk,setBk]=useState('#004D40');
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState('');

  const validate = async (e)=>{
    if(email.length>0 &&email.includes('@')&&email.includes('.')){
      if(password.length<6){
        alert("password should be greater than 6")
      }
      else if(user.length==0){
        alert('enter user name')
      }
      else{
        try{
          await axios.post("http://localhost:3000/Signup",{
            user, email,password
          }).then((res)=>{
            if(res.data=='exists'){
              alert("User exists try with new Email or just Login")
            }
            else{
              alert("LoginNow")
            }
          }).catch((err)=>{
            console.log('somme error')
          })
        }
        catch(err){
          console.log(err);
        }
        
      }
    }
    else{
      alert("fill valid details")
      
    }

    //send data to mongodb
   // e.preventDefault();
   
  }
  return (
    <div className='top'>
    
    <div className='main'>
       
       <div className='left' style={{background:bk}}> 
       <div>
       <h1>Welcome to ETracker</h1>
       <h2> Your Daily Expense Companion!</h2>
       <h3> ETracker is thrilled to help you manage your daily spending."</h3>
       <h4>New to eTracker? Create an account to effortlessly monitor and manage your daily expenses.</h4>
       <h4>Explore the world of eTracker. Log in to continue tracking or sign up for personalized expense insights.</h4>
       <h4>Unlock financial peace of mind. Sign up for eTracker's tailored expense tracking solutions.</h4>
       </div>
      <Link to='/'  style={{color:'#1DE9B6',fontSize:'2rem',textDecoration:'none'}} >Login</Link>
       </div>
       <div className='right'>
       <img src={Logo} className='logo'/>
       <div><IoPersonCircleOutline className='icon'/></div>
       <input  className='inputtt' type='text' placeholder='UserName' onChange={e=>setUser(e.target.value)}/><br></br>
       <input className='inputtt'  type='email' placeholder='EMail' onChange={e=>setEmail(e.target.value)}/><br></br>
       <input  className='inputtt' type='password' placeholder='Password' onChange={e=>setPassword(e.target.value)}/><br></br>
       <button className='btn' onClick={()=>{validate()}}>SignUp</button>
       </div>
    </div>
    </div>
  )
}
