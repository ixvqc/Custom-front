import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import '../styles/Main.css';
import logo from "../assets/img/logov2.png";
import {Link} from "react-router-dom";

const NavbarLogin = () => {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className="nav">

            <div className="logo-div">
                <img src={logo} className="logo-main"/>

            </div>

            <Link to={"/messages"} className="link">
                Wiadomości
            </Link>

            <Link to={"/user"} className="link">
                Mój profil
            </Link>
            <Link to={"/Contact"} className="link-search-compare">
                Kontakt
            </Link>

            <button className="logout" onClick={() => signOut(auth)}>logout</button>

            <button className="add-adv"
            >
                <a href="/AddAnnouncement" className="link">Dodaj ogłoszenie +</a>
            </button>

        </div>
    )
}

export default NavbarLogin