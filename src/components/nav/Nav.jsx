import React ,{useState} from "react";
import './nav.css';
import {AiOutlineProfile,AiOutlineHome,AiOutlineBars,AiOutlineCalendar,AiOutlineUser} from 'react-icons/ai'

const Nav = () => {

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
                            <a href={"http://localhost:3000/"}>
                                <span><AiOutlineHome className={ 'nav_icons'}/></span>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href={"http://localhost:3000/todo-list"}>
                                <span><AiOutlineProfile className={ 'nav_icons'}/></span>
                                Todo List
                            </a>
                        </li>

                        <li>
                           <a href={"http://localhost:3000/"}>
                               <span><AiOutlineCalendar className={'nav_icons'}/></span>
                               Calendar
                           </a>
                        </li>
                        <li>
                            <a href={"http://localhost:3000/"}>
                                <span><AiOutlineUser className={'nav_icons'}/></span>
                                Account
                            </a>
                        </li>
                    </ul>
            </div>}
            {showNav1 && <div id={'Small_Nav_Div'} >



                    <ul>
                        <li className={'Button_li'}>
                            <span><button onClick={NavShow1} className={'Button_div'} id={'Button_Close'}><AiOutlineBars color={'aliceblue'} className={ 'nav_icons'}/></button></span>
                        </li>
                        <li>
                            <a href={"http://localhost:3000/"}>
                            <span><AiOutlineHome className={ 'nav_icons'}/></span>
                            </a>
                        </li>
                        <li>
                            <a href={"http://localhost:3000/todo-list"}>
                            <span><AiOutlineProfile className={ 'nav_icons'}/></span>
                            </a>
                        </li>
                        <li>
                        <a href={"http://localhost:3000/"}>
                            <span><AiOutlineCalendar className={'nav_icons'}/></span>
                        </a>
                        </li>
                        <li>
                            <a href={"http://localhost:3000/"}>
                            <span><AiOutlineUser className={'nav_icons'}/></span>
                            </a>
                        </li>

                    </ul>
            </div>}
        </>

    )



}

export default Nav