import React from "react";
import "./account.css";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();

    navigate("/login");
  };
  return (
    <>
      <button onClick={logout} id={"logout"}>
        logout
      </button>
    </>
  );
};
export default Account;
