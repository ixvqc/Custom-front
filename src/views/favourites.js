import '../styles/favourites.css';
import React, {useContext,useState, useEffect, useRef, } from 'react';
import {useNavigate,Link} from "react-router-dom";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import logo from "../assets/img/logov2.png";
import 'firebase/auth';
import { getAuth, updateProfile, updatePassword, updateEmail, sendPasswordResetEmail} from "firebase/auth";
import {auth, db, storage} from "../firebase";
import {AuthContext} from "../context/AuthContext";






function Favourites(props) {
    const {currentUser} = useContext(AuthContext)
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const {displayName} = auth.currentUser



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
                        {/*<div className="obserwowaneus-div">*/}
                        {/*    <Link to="/favourites">*/}
                        {/*        <button className="obserwowaneus">*/}
                        {/*            Obserwowane ★*/}
                        {/*        </button>*/}
                        {/*    </Link>*/}
                        {/*</div>*/}

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






        </div>

    );


}

export default Favourites;