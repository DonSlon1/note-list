import React, {useState} from "react";
import {useContext } from 'react';
import {AiOutlineUser,AiOutlineLock} from 'react-icons/ai'
import './login.css'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

const Login =()=>{
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();


    const user={
        name:"",
        password:"",
    }
    const login=()=>{
        user.name=document.getElementById('name').value;
        user.password=document.getElementById('password').value;



        axios.post('http://localhost:8888/api/index.php', {user:user,process:"LOGIN"}).then(response=> {
            console.log(response)
            if (response.data==='loginsucesfule'){
                setAuth({user})
                navigate('/todo-list')
            }

        })





    }
 return(
     <>
     <div className={'div'}>

         <div  className={'center_text'}><span><AiOutlineUser className={'icons'} size={40}/></span> <input className={"Title"} id={'name'} type={"text"} placeholder={"Email"} /></div>

        <div className={'center_text'}><span><AiOutlineLock className={'icons'} size={40}/></span> <input className={"Title"}  id={'password'} type={"password"} placeholder={"Password"} /></div>
        <div className={'LoginButton'} onClick={login}><button className={'LoginButtonb'}>Login</button></div>
         <Link to="/todo-list">Go to Home</Link>
         <span className={'dont'}><Link className={'accaunt'} to={'/registration'}>Create account</Link></span>


     </div>

     </>
 )
}
export default Login
