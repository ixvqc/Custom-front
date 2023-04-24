import React from "react";
import '../styles/messages.css';
import user from "../assets/img/user.png"
import Messages from "./Messages";
import InputPanel from "./Inputpanel";
const Chat = () => {
    return(
        <div className="chat-messages">
            <div className="ChatInfo">
                <span>Julia</span>
                <div className="ChatIcons">
                    <img src={user}/>
                </div>
            </div>
            <Messages/>
            <InputPanel/>
        </div>


    )
}
export default Chat