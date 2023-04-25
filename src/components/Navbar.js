import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import '../styles/messages.css';

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className='navbar-msg'>
            <span className="logo-auta">Lama Chat</span>
            <div className="user-msg">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>logout</button>
            </div>
        </div>
    )
}

export default Navbar