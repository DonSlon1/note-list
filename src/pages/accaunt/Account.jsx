import React, {useEffect, useState} from "react";
import "./account.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Account = () => {
  const navigate = useNavigate();
  const [AShare,SetAShare] = useState(true)
    const [SharedUsers,SetSharedUsers] = useState([])
    const [NotExisistingUsername,SetNotExisistingUsername] = useState(false)
    const [AleradyShare,SetAleradyShare] = useState(false)
    const [Success,SetSuccess] = useState(false)

    let help = undefined;

    if (localStorage.user !== undefined) {
        help = JSON.parse(localStorage.user);
    } else if (sessionStorage.user !== undefined) {
        help = JSON.parse(sessionStorage.user);
    }
    if (help!==null) {
        useEffect(() => {
            axios.get("http://localhost:8888/api/AcShare.php", {
                params: {name: help.name}
            }).then(response => {
                SetSharedUsers(JSON.parse(response.data[0].ShareAccaunt))
            })
        }, []);
    }

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();

    navigate("/login");
  };
    const Share = () => {
        SetAShare(!AShare)
    }


  document.addEventListener('mouseup', function (e) {
      if (document.getElementById('close') !== null) {
          let container = document.getElementById('close');
          if (!container.contains(e.target)) {
              SetAShare(false)
          }
      }
  })
    document.addEventListener('mouseup', function (e) {
        if (document.getElementById('close1') !== null) {
            let container = document.getElementById('close1');
            if (!container.contains(e.target)) {
                SetNotExisistingUsername(false)
            }
        }
    })
    document.addEventListener('mouseup', function (e) {
        if (document.getElementById('close2') !== null) {
            let container = document.getElementById('close2');
            if (!container.contains(e.target)) {
                SetAleradyShare(false)
            }
        }
    })
    document.addEventListener('mouseup', function (e) {
        if (document.getElementById('close3') !== null) {
            let container = document.getElementById('close3');
            if (!container.contains(e.target)) {
                SetSuccess(false)
            }
        }
    })


    const SharedAccaunt=()=>{
        SetAleradyShare(false)
        SetNotExisistingUsername(false)
        const UserShare = document.getElementById("UserShare").value;
        axios.get("http://localhost:8888/api/Ifexist.php", {
            params: {name: UserShare}
        }).then(response1 =>{
            if (response1.data===1) {
                for (let i = 0; i < SharedUsers.length; i++) {
                    if (SharedUsers[i].Name === UserShare) {
                        SetAleradyShare(true)
                        return
                    }
                }
                axios.get("http://localhost:8888/api/upload.php", {
                    params: {name: UserShare}
                }).then(response =>{

                SetSharedUsers(prev => [
                    ...prev,
                    {
                        Name: UserShare,
                        Data :JSON.parse(response.data[0].data),
                    }
                ])})
                SetSuccess(true)

            }else {
                SetNotExisistingUsername(true)
            }
        })

    }

    useEffect(() => {
        axios.post("http://localhost:8888/api/AcShare.php", {
            process: "AddShare",
            name: help.name,
            Share: SharedUsers,
        });
    }, [SharedUsers]);
  return (
    <>
        {AleradyShare &&(
            <div className={"Error"} id={'close2'}>Uživatelské jméno je již zdíleno</div>
        )}
        {NotExisistingUsername &&(
            <div className={"Error"} id={'close1'}>Uživatelské jméno neexistuje</div>
        )}
        {Success &&(
            <div className={"Error"} id={'close3'}>Uspěšně přidáno</div>
        )}
        {AShare &&(
        <div className={"AddDiv_box"} id={'close'}>
            <span  >
                <input id={'UserShare'}/>
                <button onClick={SharedAccaunt}> Přidat</button>
            </span>
        </div>)
        }
      <button onClick={logout} id={"logout"}>
        Logout
      </button>
      <button onClick={Share} id={"share"}>
        Share Notes
      </button>
    </>
  );
};
export default Account;
