import React, { useState, useEffect } from 'react';
import {useNavigate,Link} from "react-router-dom";
import '../styles/Register.css';
import logo from '../assets/img/logov2.png';
import Notiflix from 'notiflix';
import PasswordChecklist from "react-password-checklist"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";

import { doc, setDoc } from "firebase/firestore";


import '../styles/Login.css';

import axios from "axios";

import {firestore} from "../firebase";
import {addDoc,collection} from "@firebase/firestore";



import '../styles/user.css';

import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";



function App() {


}





function User(props) {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);


    return(
        <div className="mainuser">

            <div className="navuser">

                <div className="logo-divuser">
                    <a href="http://localhost:3000">
                        <img src={logo} alt="Main.js Logo" className="logo-mainuser" />
                    </a>

                    <div className="buttongroupus">
                        <div className="obserwowaneus-div">
                            <button className="obserwowaneus">
                                Obserwowane  ★
                            </button>
                        </div>

                        <div className="Usernamedisp-div">
                        <button className="Usernamedisp">
                        loremipsum
                        </button>
                        </div>
                        <div className="ogloszenie-button-div">
                            <Link to="/AddAnnouncement">
                        <button className="ogloszenie-button">
                            Dodaj Ogłoszenie
                        </button>
                            </Link>
                        </div>


                    </div>

                </div>
            </div>
            <div className="image-backgrounduser">
                <div>
                    <button className="button1user">
                        Konto
                    </button>

                    <button className="button2user">
                        Ogłoszenia
                    </button>
                    <Link to="/messages">
                    <button className="button3user">
                        Wiadomości
                    </button>
                    </Link>
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
            <div className="App">
                <input
                    type="file"
                    onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                    }}
                />
                <button onClick={uploadFile}> Upload Image</button>
                {imageUrls.map((url) => {
                    return <img src={url} />;
                })}
            </div>

        </div>

    );
}
export default User;