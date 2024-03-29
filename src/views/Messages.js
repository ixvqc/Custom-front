import {Link} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import '../styles/messages.css';
import logo from '../assets/img/logov2.png';
import React, { useRef } from "react";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import userphoto from "../assets/img/user.png";
import Chat  from "../components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase'
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext'
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Messages() {
    const [user] = useAuthState(auth)
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [isInChat, setIsInChat] = useState(null);
    const [room, setRoom] = useState("");
    const {currentUser} = useContext(AuthContext)


    return (
    <div className="main-messages">



        <div className="nav-bar-messages">

            <div className="logo-messages">
                <a href="http://localhost:3000">
                    <img src={logo}/>
                </a>
            </div>
            <div className="username-nav-messages">
                <span>Obserwowane</span>
            </div>
            <div className="username-nav-messages">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
            </div>
            <div className="button-add-adv-messages">
                <button className="add-adv-button">
                    <Link to={"/AddAnnouncement"} className="link-messages">Dodaj ogłoszenie + </Link>
                </button>
            </div>

        </div>

        <div className="windows-messages">
              <div className="container-msg">
                  <Sidebar/>
                  <Chat/>
              </div>



        </div>

    </div>


        );
}

export default Messages;
