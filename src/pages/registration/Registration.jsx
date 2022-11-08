import React, { useState } from "react";
import "./registration.css";

import axios from "axios";
import {AiFillEye, AiFillEyeInvisible, AiOutlineLock, AiOutlineUser} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [PermLogin, SetPermLogin] = useState(false);
  const navigate = useNavigate();
  const user = {
    name: "",
    password: ""
  };
  const site="http://localhost:8888/api/"
  const [NotWorking, SetNotWorking] = useState(false);
  const [NotName, SetNotName] = useState(false);
  const [NotPassword, SetNotPassword] = useState(false);
  const [AgainNotPassword, SetAgainNotPassword] = useState(false);
  const [AgainNotPasswordSame, SetAgainNotPasswordSame] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [Email,SetEmail]=useState(false)
  const [PasswordLength,SetPasswordLength]=useState(false)
  const long_login = () => {
    SetPermLogin(!PermLogin);
  };
  const [SShow_Password, SetSShow_Password] = useState(true);
  const Show_Password = () => {
    SetSShow_Password(!SShow_Password);
    if (SShow_Password === true) {
      document.getElementById("password").type = "text";
      document.getElementById("passwordagain").type = "text";
      setIsActive(false)
      setIsActive2(true)
    }
    if (SShow_Password === false) {
      document.getElementById("password").type = "password";
      document.getElementById("passwordagain").type = "password";
      setIsActive(true)
      setIsActive2(false)
    }
  };

  const login1 = () => {
    SetNotWorking(false);
    SetNotPassword(false);
    SetAgainNotPasswordSame(false);
    SetAgainNotPassword(false);
    SetNotName(false);
    SetEmail(false);
    user.name = document.getElementById("name").value;
    user.password = document.getElementById("password").value;
    const passwordagain = document.getElementById("passwordagain").value;
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    SetPasswordLength(false)
    SetNotWorking(false);
    SetNotName(false);
    SetNotPassword(false);
    if (
        reg.test(user.name)===true &&
        user.name !== "" &&
        user.password !== "" &&
        passwordagain === user.password &&
        (user.password).length>10
    ) {
      console.log(1);
      axios
          .post((site+"createaccaunt.php"), {
            user: user,
            process: "LOGIN"
          })
          .then(response => {
            if (response.data === "taken") {
              SetNotWorking(true);
            } else {
              localStorage.setItem("user", JSON.stringify(user));
              navigate("/todo-list");
              if (PermLogin === true) {
                console.log(user.name);
                localStorage.setItem("user", JSON.stringify(user));
              }
            }
          });
    } else {
      if (user.name === "") {
        SetNotName(true);
      } else if (user.password === "") {
        SetNotPassword(true);
      } else if (passwordagain === "") {
        SetAgainNotPassword(true);
      } else if (passwordagain !== user.password) {
        SetAgainNotPasswordSame(true);
      } else if (reg.test(user.name)===false){
        SetEmail(true)
      } else if ((user.password).length<10){
        SetPasswordLength(true)
      }
    }
  };
  return (
      <>
        <div className={"div"}>
          {PasswordLength &&(
              <div className={"wrong"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>
                <span>Password is to short</span>
              </div>
          )}
          {Email &&(
              <div className={"wrong"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>
                <span>Email is not valid</span>
              </div>
          )}
          {NotWorking && (
              <div className={"wrong"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>
                <span>Email is already taken</span>
              </div>
          )}
          {NotPassword && (
              <div className={"wrong"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>
                <span>Password is empty</span>
              </div>
          )}
          {NotName && (
              <div className={"wrong"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>
                <span>Email is empty</span>
              </div>
          )}
          {AgainNotPassword && (
              <div className={"wrong"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>
                <span>Password again is empty</span>
              </div>
          )}
          {AgainNotPasswordSame && (
              <div className={"wrong"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>
                <span>Password and Password again is not same</span>
              </div>
          )}
          <div className={"divtext"}>
            <div className={"center_text"}>
            <span>
              <AiOutlineUser className={"icons"} size={40} />
            </span>{" "}
              <input
                  className={"Title"}
                  id={"name"}
                  type={"text"}
                  placeholder={"Email"}
              />
            </div>

            <div className={"center_text"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>{" "}
              <input
                  className={"Title"}
                  id={"password"}
                  type={"password"}
                  placeholder={"Password"}
              />
            </div>

            <div className={"center_text"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>{" "}
              <input
                  className={"Title"}
                  id={"passwordagain"}
                  type={"password"}
                  placeholder={"Password again"}
              />
              <span>
              {isActive &&
                  <AiFillEye className={"icons"} onMouseDown={Show_Password} onMouseUp={Show_Password} size={40}
                             id={"passwords"}/>}
                {
                    isActive2 && <AiFillEyeInvisible className={"icons"} onMouseDown={Show_Password} onMouseUp={Show_Password} size={40}
                                                     id={"passwords"}/>
                }
            </span>
            </div>
            <span id={"long_login_sapn"}><label id={"long_login"}>
            <input type={"checkbox"} onClick={long_login} id={"long_login"}/>
            Remember me</label>
          </span>
            <div className={"LoginButton"} >
              <button className={"LoginButtonb"} onClick={login1}>Create account</button>
            </div>
            <span className={"dont"}>
            <Link className={"accaunt"} to={"/login"}>
              Already have account
            </Link>
          </span>
          </div>
        </div>
      </>
  );
};
export default Registration;
