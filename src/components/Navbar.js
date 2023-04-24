import '../styles/messages.css';
import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
const NavBar = () => {
    const {currentUser} = useContext(AuthContext)

    return(
<div className='navbar-msg'>
    <span className="logo-auta">Lama Chat</span>
    <div className="user-msg">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
    </div>
</div>
)
}

export default NavBar