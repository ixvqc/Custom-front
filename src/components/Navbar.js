import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import '../styles/messages.css';

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className='navbar-msg'>
            <span className="logo-auta"></span>
            <div className="user-msg">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
            </div>
        </div>
    )
}

export default Navbar