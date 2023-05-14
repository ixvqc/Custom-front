import React, {useContext,useState, useEffect, useRef, } from 'react';
import {useNavigate,Link} from "react-router-dom";
import '../styles/user.css';
import logo from '../assets/img/logov2.png';

import {auth, db, storage} from "../firebase";

import { AuthContext } from '../context/AuthContext'

import 'firebase/auth';

import { getAuth, updateProfile, updatePassword, updateEmail, sendPasswordResetEmail} from "firebase/auth";







import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";




function User(props) {
    // const auth = getAuth();
    // updateProfile(auth.currentUser, {
    //     displayName: "pablito000", photoURL: "https://firebasestorage.googleapis.com/v0/b/custom-e30bd.appspot.com/o/hubertkox11682425193730?alt=media&token=e1bc5d83-9e21-412a-9548-9dacd00fd467"
    // }).then(() => {
    //     console.log("super")
    // }).catch((error) => {
    //     console.log("zle")
    // });
    const nameref = useRef();


    const {currentUser} = useContext(AuthContext)


    const handleClick1 = () => {

        const auth = getAuth();

        updateProfile(auth.currentUser, {
            displayName: nameref.current.value,

        }).then(() => {
            console.log("super");
        }).catch((error) => {
            console.log("zle");
        });
    };

    const refemail = useRef();
    const handleClick2 = () => {
        const auth = getAuth();

        updateEmail(auth.currentUser,    {email: refemail.current.value,
        })

            .then(() => {
                console.log("super");
            }).catch((error) => {
            console.log("ua");
            throw error;
        });
    };
    const handleClick3 = () => {

        const email = currentUser.email;
        console.log(email);
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("udalo sie");
                console.log(email)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("ups");
                throw error;
                // ..
            });
    }




    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    // const {displayName} = auth.currentUser



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


    return (
        <div className="mainuser">

            <div className="navuser">

                <div className="logo-divuser">
                    <a href="http://localhost:3000">
                        <img src={logo} alt="Main.js Logo" className="logo-mainuser"/>
                    </a>

                    <div className="buttongroupus">
                        <div className="obserwowaneus-div">

                            <Link to="/favourites">
                            <button className="obserwowaneus">
                                Obserwowane ★
                            </button>
                                </Link>

                        </div>

                        <div className="Usernamedisp-div">
                            <button className="Usernamedisp">

                                <span>{currentUser.displayName}</span>

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
            <div className="user">


            </div>
            <div>


            </div>
            <div className="cos">
                <div className="button-container">


                    <div className="">
                        <button className="usernamech-button" onClick={handleClick1}>
                            Zmień Nazwę Użytkownika
                        </button>
                        <input required="" type="text" className="inputnamech" ref={nameref}/>
                    </div>

                    <button className="passwordch-button" onClick={handleClick3}>
                        Zmień Hasło
                    </button>


                </div>
                <div className="userphotouser">
                    <img src={currentUser.photoURL} alt=""/>
                </div>
            </div>
            <div>

            </div>

        </div>


    );


}
export default User;