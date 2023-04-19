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
import Chat  from "../components/ChatBox";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase'
import SignIn from '../components/SignIn';
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
            <div className="Left-window-messages">

                <div className="input-container-msg">
                    <input type="text" id="input-msg" required=""/>
                        <label htmlFor="input-msg" className="label-msg">Wyszukaj  ogłoszenie</label>
                </div>
                <input onChange={(e) => setRoom(e.target.value)} />
                <button
                    onClick={() => {
                        setIsInChat(true);
                    }}
                >
                    Enter Chat
                </button>


            </div>
            <div className="right-window-messages">
                <div className="adv-panel-messages">
                    <img src={car3} className="car-photo-messages"/>

                    <div className="active-price-messages">
                        <button className="active-button">
                            Aktywne
                        </button>
                        <text className="price-adv-messages">2450 zł </text>
                    </div>
                    <text className="name-adv-messages">Skoda fabia nówka sztuka </text>

                    <div className="username-photo-messages">
                        <img src={userphoto} className="user-photo-messages"/>
                        <text className="username-messages">Jan Nowak </text>
                    </div>
                </div>

                <div className="messages-window">

                    <>
                        {user ? <Chat /> : <SignIn />}
                    </>



                </div>
            </div>

        </div>

    </div>


        );
}

export default Messages;
