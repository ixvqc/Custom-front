import {useState, useEffect} from "react";
import '../styles/user.css';


import React, { useReducer } from 'react';
import logo from "../assets/img/logov2.png";
import Profile from "./Profile";
function User(props) {

    return(
        <div className="main">

            <div className="nav">

                <div className="logo-div">
                    <a href="http://localhost:3000">
                        <img src={logo} alt="Main.js Logo" className="logo-main" />
                    </a>
                    <div>
                        <button className="ogloszenie-button">
                            Dodaj Ogłoszenie
                        </button>
                    </div>
                </div>
            </div>
            <div className="image-background">
                <div>
                    <button className="button1user">
                        Konto
                    </button>

                    <button className="button2user">
                        Ogłoszenia
                    </button>

                    <button className="button3user">
                        Wiadomości
                    </button>

                    <button className="button4user">
                        Płatności
                    </button>
                </div>
            </div>
            <div>
                <button className="usernamech-button">
                    Zmień Nazwę Użytkownika
                </button>
                <div>
                <button className="passwordch-button">
                    Zmień Hasło
                </button>
                </div>
                <div>
                    <button className="emailch-button">
                        Zmień E-mail
                    </button>
                </div>
                <div>
                    <button className="infoch-button">
                        Zaktualizuj informacje
                    </button>
                    
                </div>
            </div>

        </div>

    );
}
export default User;