import React from "react";
import '../styles/messages.css';
import Search from "../components/Search"
import Chats from "../components/Chats"
import NavBar from "./Navbar";

const Sidebar = () => {
    return(
        <div className="sidebar">
            <NavBar/>
            <Search/>
            <Chats/>

        </div>
    )
}
export default Sidebar