import React, { useState } from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [PermLogin, SetPermLogin] = useState(false);
  const [notexistinusername, Setnotexistinusername] = useState(false);
  const [badpassword, Setbadpassword] = useState(false);

  const user = {
    name: "",
    password: ""
  };
  const long_login = () => {
    SetPermLogin(!PermLogin);
  };
  if (localStorage.user !== undefined || sessionStorage.user !== undefined) {
    React.useEffect(() => {
      navigate("/account");
    });
  }
  const [SShow_Password, SetSShow_Password] = useState(true);
  const Show_Password = () => {
    SetSShow_Password(!SShow_Password);
    if (SShow_Password === true) {
      document.getElementById("password").type = "text";
    }
    if (SShow_Password === false) {
      document.getElementById("password").type = "password";
    }
  };
  const login = () => {
    user.name = document.getElementById("name").value;
    user.password = document.getElementById("password").value;

    axios
      .post("http://localhost:8888/api/index.php", {
        user: user,
        process: "LOGIN"
      })
      .then(response => {
        console.log(response);
        if (response.data === "loginsucesfule") {
          console.log(user);
          sessionStorage.setItem("user", JSON.stringify(user));
          if (PermLogin === true) {
            console.log(user.name);
            localStorage.setItem("user", JSON.stringify(user));
          }
          navigate("/todo-list");
        }
        if (response.data === "notexistinusername") {
          Setnotexistinusername(true);
          Setbadpassword(false);
        }
        if (response.data === "badpassword") {
          Setbadpassword(true);
          Setnotexistinusername(false);
          console.log(badpassword);
        }
      });
  };

  return (
    <>
      <div className={"div"}>
        {badpassword && (
          <div className={"wrong"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>
            <span>Your password is Incorect</span>
          </div>
        )}
        {notexistinusername && (
          <div className={"wrong"}>
            <span>
              <AiOutlineLock className={"icons"} size={40} />
            </span>
            <span>Your username is Incorect</span>
          </div>
        )}
        <div id={"divtext"}>
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
          <span id={"long_login_sapn"}>
            <input type={"checkbox"} onClick={long_login} id={"long_login"} />
            Remember me
          </span>
          <span id={"showpassword"}>
            <input type={"checkbox"} onClick={Show_Password} id={"password"} />
            Show password
          </span>
          <div className={"LoginButton"} onClick={login}>
            <button className={"LoginButtonb"}>Login</button>
          </div>
          <span className={"dont"}>
            <Link className={"accaunt"} to={"/registration"}>
              f Create account
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};
export default Login;
