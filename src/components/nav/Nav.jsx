import React, {useContext, useState} from "react";
import './nav.css';
import {AiOutlineProfile,AiOutlineHome,AiOutlineBars,AiOutlineCalendar,AiOutlineUser} from 'react-icons/ai'
import {Link, Navigate} from "react-router-dom"
import AuthContext from "../../context/AuthProvider";

const Nav = () => {


    if ((useContext(AuthContext)['auth']['user'])===undefined){
        return <Navigate replace to="/login" />
    }
    const [showNav, setShowNav] = useState(false)
    const [showNav1,setShowNav1]= useState(true)
    const todo_element=document.getElementsByClassName('todo-element')
    const NavShow1=()=> {
        setShowNav(true)
        setShowNav1(false)

        if ('http://localhost:3000/todo-list'===window.location.href){
            for (let i=0;i<todo_element.length;i++){
                todo_element[i].style.marginLeft='60px'
            }
            document.getElementById('todo').style.marginLeft='10%';
        }

    };
    const NavShow=()=>{
        setShowNav1(true)
        setShowNav(false)
        if ('http://localhost:3000/todo-list'===window.location.href){
            for (let i=0;i<todo_element.length;i++){
                todo_element[i].style.marginLeft='88px'
            }
            document.getElementById('todo').style.marginLeft='73px';}
    };

    return (
        <>
            {showNav && <div id={'Nav_Div'} >

                    <ul>
                        <li className={'Button_li'}>
                            Notes
                            <span><button onClick={NavShow} className={'Button_div'} id={'Button_Close'}><AiOutlineBars color={'aliceblue'} className={ 'nav_icons'}/></button></span>
                        </li>
                        <li>
                            <Link className={'nava'} to="/App">
                                <span><AiOutlineHome className={ 'nav_icons'}/></span>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link  className={'nava'} to={"/todo-list"}>
                                <span><AiOutlineProfile className={ 'nav_icons'}/></span>
                                Todo List
                            </Link>
                        </li>

                        <li>
                           <Link  className={'nava'} to={"/"}>
                               <span><AiOutlineCalendar className={'nav_icons'}/></span>
                               Calendar
                           </Link>
                        </li>
                        <li>
                            <Link className={'nava'} to={"/login"}>
                                <span><AiOutlineUser className={'nav_icons'}/></span>
                                Account
                            </Link>
                        </li>
                    </ul>
            </div>}
            {showNav1 && <div id={'Small_Nav_Div'} >



                    <ul>
                        <li className={'Button_li'}>
                            <span><button onClick={NavShow1} className={'Button_div'} id={'Button_Close'}><AiOutlineBars color={'aliceblue'} className={ 'nav_icons'}/></button></span>
                        </li>
                        <li>
                            <Link className={'nava'} to={"/App"}>
                            <span><AiOutlineHome className={ 'nav_icons'}/></span>
                            </Link>
                        </li>
                        <li>
                            <Link className={'nava'} to={"/todo-list"}>
                            <span><AiOutlineProfile className={ 'nav_icons'}/></span>
                            </Link>
                        </li>
                        <li>
                        <Link className={'nava'} to={"/"}>
                            <span><AiOutlineCalendar className={'nav_icons'}/></span>
                        </Link>
                        </li>
                        <li>
                            <Link className={'nava'} to={"/login"}>
                            <span><AiOutlineUser className={'nav_icons'}/></span>
                            </Link>
                        </li>

                    </ul>
            </div>}
        </>

    )



}

export default Nav