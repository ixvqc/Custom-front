import React, { useContext } from "react";
import '../styles/messages.css';
import user from "../assets/img/user.png"
import Messages from "./Messages";
import InputPanel from "./Inputpanel";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);
    return(
        <div className="chat-messages">
            <div className="ChatInfo">
                <span>{data.user?.displayName}</span>
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