import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/messages.css';
import logo from '../assets/img/logov2.png';
import React, { useRef } from "react";
import {firestore} from "../firebase";
import {addDoc,collection} from "@firebase/firestore";
import car3 from "../assets/img/car3.jpg";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import userphoto from "../assets/img/user.png";
import Chat  from "../components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase'
import Sidebar from '../components/Sidebar';

import Cookies from "universal-cookie";

const cookies = new Cookies();

function Messages() {
    const [user] = useAuthState(auth)
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [isInChat, setIsInChat] = useState(null);
    const [room, setRoom] = useState("");





    return (
    <div className="main-messages">



        <div className="nav-bar-messages">

            <div className="logo-messages">
                <img src={logo} className="logo-messages-img"/>
            </div>
            <div className="username-nav-messages">
                <text className="user-messages">Obserwowane</text>
            </div>
            <div className="username-nav-messages">
                <text className="user-messages">User </text>
            </div>
            <div className="button-add-adv-messages">
                <button className="add-adv-button">
                    <Link to={"/login"} className="link-messages">Dodaj ogłoszenie + </Link>
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
