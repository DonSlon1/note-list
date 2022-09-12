import React, {useContext, useState} from "react";
import './registration.css';
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import {AiOutlineLock, AiOutlineUser} from "react-icons/ai";
import {Link,useNavigate} from "react-router-dom";

const Registration =()=>{
    const { setAuth } = useContext(AuthContext);

    const navigate = useNavigate();
    const user={
        name:"",
        password:"",
    }
    const [NotWorking,SetNotWorking]=useState(false)
    const [NotName,SetNotName]=useState(false)
    const [NotPassword,SetNotPassword]=useState(false)
    const login1=()=>{
        user.name=document.getElementById('name').value;
        user.password=document.getElementById('password').value;

        if (user.name!==""&&user.password!=="") {
            console.log(1)
            SetNotWorking(false);
            SetNotName(false);
            SetNotPassword(false);
            axios.post('http://localhost:8888/api/createaccaunt.php', {user: user, process: "LOGIN"}).then(response => {

                if(response.data === 'taken') {
                    SetNotWorking(true)
                }
                else{
                    setAuth({user})
                    navigate('/todo-list')
                }

            })
            // axios.get('http://localhost:8888/api/index.php',{ params: { answer: 42 } })

        }
        else {
            if (user.name===""){
                SetNotWorking(false);
                SetNotPassword(false);
                SetNotName(true)
            }
            else if (user.password===""){
                SetNotWorking(false);
                SetNotName(false);
                SetNotPassword(true)
            }
        }



    }
    return(
        <>
            <div className={'div'}>
                {NotWorking &&(
                    <div className={'take'}>Username is already take</div>
                )
                }
                {NotPassword &&(
                    <div className={'take'}>Password is empty</div>
                )
                }
                {NotName &&(
                    <div className={'take'}>Username is empty</div>
                )
                }
                <div  className={'center_text'}><span><AiOutlineUser className={'icons'} size={40}/></span> <input className={"Title"} id={'name'} type={"text"} placeholder={"Email"} /></div>

                <div className={'center_text'}><span><AiOutlineLock className={'icons'} size={40}/></span> <input className={"Title"}  id={'password'} type={"password"} placeholder={"Password"} /></div>

                <div className={'LoginButton'} onClick={login1}><button className={'LoginButtonb'}>Login</button></div>
                <Link to="/todo-list">Go to Home</Link>
                <span className={'dont'}><Link className={'accaunt'} to={'/login'}>Already have account</Link></span>


            </div>

        </>
    )
}
export default Registration