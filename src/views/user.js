import {useState, useEffect} from "react";
import '../styles/user.css';


import React, { useReducer } from 'react';
import logo from "../assets/img/logov2.png";
import Profile from "./Profile";
// const User = () => {
//     const [err, setErr] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const [password, setPassword] = useState("")
//
//     const handleSubmit = async (e) => {
//         setLoading(true);
//         e.preventDefault();
//         const displayName = e.target[0].value;
//         const email = e.target[1].value;
//         const password = e.target[2].value;
//         const file = e.target[3].files[0];
//
//         try {
//             //Create user
//             const res = await createUserWithEmailAndPassword(auth, email, password);
//
//             //Create a unique image name
//             const date = new Date().getTime();
//             const storageRef = ref(storage, `${displayName + date}`);
//
//             await uploadBytesResumable(storageRef, file).then(() => {
//                 getDownloadURL(storageRef).then(async (downloadURL) => {
//                     try {
//                         //Update profile
//                         await updateProfile(res.user, {
//                             displayName,
//                             photoURL: downloadURL,
//                         });
//                         //create user on firestore
//                         await setDoc(doc(db, "users", res.user.uid), {
//                             uid: res.user.uid,
//                             displayName,
//                             email,
//                             photoURL: downloadURL,
//                         });
//
//                         //create empty user chats on firestore
//                         await setDoc(doc(db, "userChats", res.user.uid), {});
//                         navigate("/");
//                     } catch (err) {
//                         console.log(err);
//                         setErr(true);
//                         setLoading(false);
//                     }
//                 });
//             });
//         } catch (err) {
//             setErr(true);
//             setLoading(false);
//         }
//     };
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
                <div className="Add-avatar-register">
                    <button className="button-add-avatar-register">Dodaj zdjęcie</button>
                </div>
            </div>

        </div>

    );
}
export default User;