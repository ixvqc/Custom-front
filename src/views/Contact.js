import React, {useContext,useState, useEffect, useRef, } from 'react';
import {useNavigate,Link} from "react-router-dom";
import '../styles/Contact.css';
import logo from '../assets/img/logov2.png';
import { AuthContext } from '../context/AuthContext'
import 'firebase/auth';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {auth, db, firestore} from '../firebase'
import 'firebase/firestore';
import {collection, getDocs} from "@firebase/firestore";
import {signOut} from "firebase/auth";


function Contact(props) {



    return (

            <div className={"mainContact"}>

                <div className="navContact">

                    <div className="logo-div-Contact">
                        <Link to={"/"} className="link-Contact">
                        <img src={logo} className="logo-main-Contact"/>
                        </Link>
                    </div>

                    <Link to={"/user"} className="link-search-compare">
                        Moje konto
                    </Link>
                    <Link to={"/messages"} className="link-search-compare">
                        wiadomości
                    </Link>
                    <Link to={"/Contact"} className="link-search-compare">
                        Kontakt
                    </Link>


                    <Link to="/"><button className="logout-button" onClick={() => signOut(auth)}>logout</button></Link>

                    <button className="add-adv-search-compare">
                        <Link to={"/AddAnnouncement"} className="link-search-compare">Dodaj ogłoszenie + </Link>
                    </button>

                </div>

                <div className="containerContact">
                    <div>
                        <div className="titlemainContact">
                            Kontakt i pomoc
                        </div>

                    </div>
                    <div>
                        <div className="titleContact">
                            Adres centrali
                        </div>
                        <div className="contentContact">
                            <a href="https://www.google.com/maps/search/ul.+Prószkowska+76,+45-758+Opole" target="_blank">
                                ul. Prószkowska 76, 45-758 Opole
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="titleContact">
                            Godziny pracy
                        </div>
                        <div className="contentContact">
                            <a>
                                pon. - pt. 8:00 - 15:00
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="titleContact">
                            Telefon
                        </div>
                        <div className="contentContact">
                            <a href="tel:+48774498000">
                                +48 77 449 80 00
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="titleContact">
                            Mail
                        </div>
                        <div className="contentContact">
                            <a href="mailto:custom.webserwis@gmail.com">
                                custom.webserwis@gmail.com
                            </a>
                        </div>
                    </div>


                </div>
            </div>

    );


}
export default Contact;