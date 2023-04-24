import React from "react";
import '../styles/messages.css';
import user from "../assets/img/user.png"
const NavBar = () => {
    return(
        <div className="navbar-msg">
            <span className="logo-auta">Ford fiesta</span>
            <div className="user-msg">
                <img src={user} alt="" />
                <span>John</span>
                <button>logout</button>
            </div>
        </div>
    )
}
export default NavBar