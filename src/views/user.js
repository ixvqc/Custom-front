import {useState, useEffect} from "react";
import '../styles/user.css';


import React, { useReducer } from 'react';
import logo from "../assets/img/logov2.png";
import Profile from "./Profile";
function User(props) {

    return(
    <div className="tlo-user">
        <div className="obraz">

        </div>
        <div className="logo-container">
            <a href="http://localhost:3000">
                <img src={logo} alt="Main.js Logo" className="logo_user"/>
            </a>
        </div>

    </div>
    );
}
export default User;