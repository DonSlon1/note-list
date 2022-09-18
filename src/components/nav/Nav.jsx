import React, { useEffect, useState } from "react";
import "./nav.css";
import {
  AiOutlineProfile,
  AiOutlineHome,
  AiOutlineBars,
  AiOutlineCalendar,
  AiOutlineUser
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [showNav, setShowNav] = useState(false);
  const [showNav1, setShowNav1] = useState(true);
  const todo_element = document.getElementsByClassName("todo-element");
  const navigate = useNavigate();

  if (localStorage.user === undefined || sessionStorage.user === undefined) {
    if (localStorage.user === undefined) {
      React.useEffect(() => {
        navigate("/login");
      });
    }
  }
  if (showNav === true) {
    document.documentElement.style.setProperty("--offset-of-nav", "197px");
    document.documentElement.style.setProperty("--offset-of-todo", "60px");
  }
  if (showNav1 === true) {
    document.documentElement.style.setProperty("--offset-of-nav", "73px");
    document.documentElement.style.setProperty("--offset-of-todo", "88px");
  }
  const NavShow1 = () => {
    setShowNav(true);
    setShowNav1(false);
  };
  const NavShow = () => {
    setShowNav1(true);
    setShowNav(false);
  };

  return (
    <>
      {showNav && (
        <div id={"Nav_Div"}>
          <ul>
            <li className={"Button_li"}>
              Notes
              <span>
                <button
                  onClick={NavShow}
                  className={"Button_div"}
                  id={"Button_Close"}
                >
                  <AiOutlineBars color={"aliceblue"} className={"nav_icons"} />
                </button>
              </span>
            </li>
            <li>
              <Link className={"nava"} to="/App">
                <span>
                  <AiOutlineHome className={"nav_icons"} />
                </span>
                Home
              </Link>
            </li>
            <li>
              <Link className={"nava"} to={"/todo-list"}>
                <span>
                  <AiOutlineProfile className={"nav_icons"} />
                </span>
                Todo List
              </Link>
            </li>

            <li>
              <Link className={"nava"} to={"/calendar"}>
                <span>
                  <AiOutlineCalendar className={"nav_icons"} />
                </span>
                Calendar
              </Link>
            </li>
            <li>
              <Link className={"nava"} to={"/account"}>
                <span>
                  <AiOutlineUser className={"nav_icons"} />
                </span>
                Account
              </Link>
            </li>
          </ul>
        </div>
      )}
      {showNav1 && (
        <div id={"Small_Nav_Div"}>
          <ul>
            <li className={"Button_li"}>
              <span>
                <button
                  onClick={NavShow1}
                  className={"Button_div"}
                  id={"Button_Close"}
                >
                  <AiOutlineBars color={"aliceblue"} className={"nav_icons"} />
                </button>
              </span>
            </li>
            <li>
              <Link className={"nava"} to={"/App"}>
                <span>
                  <AiOutlineHome className={"nav_icons"} />
                </span>
              </Link>
            </li>
            <li>
              <Link className={"nava"} to={"/todo-list"}>
                <span>
                  <AiOutlineProfile className={"nav_icons"} />
                </span>
              </Link>
            </li>
            <li>
              <Link className={"nava"} to={"/calendar"}>
                <span>
                  <AiOutlineCalendar className={"nav_icons"} />
                </span>
              </Link>
            </li>
            <li>
              <Link className={"nava"} to={"/account"}>
                <span>
                  <AiOutlineUser className={"nav_icons"} />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
