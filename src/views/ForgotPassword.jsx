import React, { useState } from "react";
import {useEffect} from "react";
import '../styles/Register.css';
import Add from "../img/addAvatar.png";
import logo from '../assets/img/logov2.png';
import Notiflix from 'notiflix';
import PasswordChecklist from "react-password-checklist"
import {createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, updateProfile} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useReducer } from 'react';
import {NotificationContainer, NotificationManager} from "react-notifications";

const ForgotPassword = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState("")

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handlePasswordChange = () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess(true);
                NotificationManager.success('Pomyślnie wysłano resetowanie hasła', 'Success');
            })
            .catch((error) => {
                setError(error.message);
                NotificationManager.error('Nieprawidłowy adres email', 'Błąd');
            })
            .finally(() => {
                setLoading(false);


            });
    };

    return (
        <div className="background-login">
            <nav className="logo-container">
                <a href="/">
                    <img src={logo} alt="Main.js Logo" className="logo_login" />
                </a>
            </nav>
            <div className="login-background">
                <div className="login-text">
                    Odzyskiwanie hasła
                </div>
                <form  className="login-form">
                    <div className="email-container-login">
                        <input
                            required
                            type="email"
                            placeholder="Podaj adres e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ border: '2px solid rgba(0, 0, 0, 0.31)' }}
                            name="email"
                            className="email-input-login"
                        />
                    </div>
                    <div className="helpdivFPass"></div>
                    <button
                        className="button-login"
                        type="button"
                        onClick={handlePasswordChange}
                        disabled={loading}
                    >
                        Wyślij
                    </button>


                </form>
            </div>
            <NotificationContainer />
        </div>
    );
};



export default ForgotPassword;
