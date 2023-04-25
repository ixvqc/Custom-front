import React, {useContext,useState, useEffect} from 'react';
import {useNavigate,Link} from "react-router-dom";
import '../styles/user.css';
import logo from '../assets/img/logov2.png';

import {auth, db, storage} from "../firebase";

import { AuthContext } from '../context/AuthContext'

import 'firebase/auth';
import { getAuth, updateProfile } from "firebase/auth";





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
    //     displayName: "pablito2111", photoURL: "https://firebasestorage.googleapis.com/v0/b/custom-e30bd.appspot.com/o/hubertkox11682425193730?alt=media&token=e1bc5d83-9e21-412a-9548-9dacd00fd467"
    // }).then(() => {
    //     console.log("super")
    // }).catch((error) => {
    //     console.log("zle")
    // });


        function updateProfile() {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
        displayName: "marcin", photoURL: "https://firebasestorage.googleapis.com/v0/b/custom-e30bd.appspot.com/o/hubertkox11682425193730?alt=media&token=e1bc5d83-9e21-412a-9548-9dacd00fd467"
    }).then(() => {
        console.log("Profile updated successfully.");
    }).catch((error) => {
        console.log("Error updating profile:", error);
    });
    }



    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    // const {displayName} = auth.currentUser
    const {currentUser} = useContext(AuthContext)


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
            <button onClick={updateProfile}>Update Profile</button>
            <div className="cos">
                <div className="button-container">
                    <button className="usernamech-button" >

                        Zmień Nazwę Użytkownika
                    </button>
                    <button className="passwordch-button" >
                        Zmień Hasło
                    </button>
                    <button className="emailch-button">
                        Zmień E-mail
                    </button>
                    <button className="infoch-button">
                        Zaktualizuj informacje
                    </button>
                </div>
                <div className="userphotouser">
                    <img src={currentUser.photoURL} alt="" />
                </div>
            </div>
<div>

</div>

        </div>

    );
}
export default User;