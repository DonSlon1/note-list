import React, { useContext, useState } from "react";
import "./registration.css";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const { setAuth } = useContext(AuthContext);
  const [PermLogin, SetPermLogin] = useState(false);
  const navigate = useNavigate();
  const user = {
    name: "",
    password: ""
  };
  const [NotWorking, SetNotWorking] = useState(false);
  const [NotName, SetNotName] = useState(false);
  const [NotPassword, SetNotPassword] = useState(false);
  const [AgainNotPassword, SetAgainNotPassword] = useState(false);
  const [AgainNotPasswordSame, SetAgainNotPasswordSame] = useState(false);
  const long_login = () => {
    SetPermLogin(!PermLogin);
  };
  const [SShow_Password, SetSShow_Password] = useState(true);
  const Show_Password = () => {
    SetSShow_Password(!SShow_Password);
    if (SShow_Password === true) {
      document.getElementById("password").type = "text";
      document.getElementById("passwordagain").type = "text";
    }
    if (SShow_Password === false) {
      document.getElementById("password").type = "password";
      document.getElementById("passwordagain").type = "password";
    }
  };
  const login1 = () => {
    user.name = document.getElementById("name").value;
    user.password = document.getElementById("password").value;
    const passwordagain = document.getElementById("passwordagain").value;

    if (
      user.name !== "" &&
      user.password !== "" &&
      passwordagain === user.password
    ) {
      console.log(1);
      SetNotWorking(false);
      SetNotName(false);
      SetNotPassword(false);
      axios
        .post("http://localhost:8888/api/createaccaunt.php", {
          user: user,
          process: "LOGIN"
        })
        .then(response => {
          if (response.data === "taken") {
            SetNotWorking(true);
            SetNotPassword(false);
            SetNotName(false);
            SetAgainNotPasswordSame(false);
            SetAgainNotPassword(false);
          } else {
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/todo-list");
            if (PermLogin === true) {
              console.log(user.name);
              localStorage.setItem("user", JSON.stringify(user));
            }
          }
        });
      // axios.get('http://localhost:8888/api/index.php',{ params: { answer: 42 } })
    } else {
      if (user.name === "") {
        SetNotWorking(false);
        SetNotPassword(false);
        SetNotName(true);
        SetAgainNotPasswordSame(false);
        SetAgainNotPassword(false);
      } else if (user.password === "") {
        SetNotWorking(false);
        SetNotName(false);
        SetNotPassword(true);
        SetAgainNotPasswordSame(false);
        SetAgainNotPassword(false);
      } else if (passwordagain === "") {
        SetNotWorking(false);
        SetNotName(false);
        SetNotPassword(false);
        SetAgainNotPassword(true);
        SetAgainNotPasswordSame(false);
      } else if (passwordagain !== user.password) {
        SetNotWorking(false);
        SetNotName(false);
        SetNotPassword(false);
        SetAgainNotPasswordSame(true);
        SetAgainNotPassword(false);
      }
    }
  };
  return (
    <>
      <div className={"div"}>
        {NotWorking && (
          <div className={"wrong"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>
            <span>Username is already taken</span>
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
            <span>Username is empty</span>
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
          </div>
          <span id={"long_login_sapn"}>
            <input type={"checkbox"} onClick={long_login} id={"long_login"} />
            Remember me
          </span>
          <span id={"showpassword"}>
            <input type={"checkbox"} onClick={Show_Password} id={"password"} />
            Show password
          </span>
          <div className={"LoginButton"} onClick={login1}>
            <button className={"LoginButtonb"}>Login</button>
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
