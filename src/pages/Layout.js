import React from "react";
import {Outlet} from "react-router-dom";
import {Nav} from "../components/index";
import './layout.css'

const Layout = () => {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
};

export default Layout;