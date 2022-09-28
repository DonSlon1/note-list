import React, {useEffect, useState} from "react";
import "./account.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Account = () => {
  const navigate = useNavigate();
  const [AShare,SetAShare] = useState(true)
    const [Check,SetCheck] = useState(false)
    const [SharedUsers,SetSharedUsers] = useState([])
    const [NotExisistingUsername,SetNotExisistingUsername] = useState(false)
    const [AleradyShare,SetAleradyShare] = useState(false)
    const [DisableSharing,SetDisableSharing] =useState(false)

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

  const ShareInDatabase = () => {
      SetCheck(!Check)
      axios.post("http://localhost:8888/api/share.php", {
          data: !Check,
          process: "POST",
          name: help.name
      });
    }
    const SharedAccaunt=()=>{
        const UserShare = document.getElementById("UserShare").value;
        axios.get("http://localhost:8888/api/Ifexist.php", {
            params: {name: UserShare}
        }).then(response1 =>{
            if (response1.data===1) {
                axios.get("http://localhost:8888/api/share.php", {
                    params: {Share: UserShare}
                }).then(response => {
                    if(response.data[0].Share===true) {
                        for (let i = 0; i < SharedUsers.length; i++) {
                            if (SharedUsers[i].Name === UserShare) {
                                SetAleradyShare(true)
                                return
                            }
                        }
                        SetSharedUsers(prev => [
                            ...prev,
                            {
                                Name: UserShare,
                            }
                        ])

                    }
                    else {
                        SetDisableSharing(true)
                    }
                })
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
        {DisableSharing &&(
            <div className={"Error"}>Uživatelské má vyplé zdílení</div>
        )}
        {AleradyShare &&(
            <div className={"Error"} >Uživatelské jméno je již zdíleno</div>
        )}
        {NotExisistingUsername &&(
            <div className={"Error"}>Uživatelské jméno neexistuje</div>
        )}
        {AShare &&(
        <div className={"AddDiv_box"} id={'close'}>
            <span>
                Povololit Zdílení
                <input type={'checkbox'} value={'on'} onClick={ShareInDatabase}/>
            </span>
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
