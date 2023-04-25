import React, { useContext } from "react";
import Cam from "../assets/img/cam.png";
import Add from "../assets/img/add.png";
import More from "../assets/img/more.png";
import Messages from "../components/Messages";
import { ChatContext } from "../context/ChatContext";
import InputPanel from "../components/Inputpanel";
import '../styles/messages.css';

const Chat = () => {
    const { data } = useContext(ChatContext);

    return (
        <div className="chat-messages">
            <div className="ChatInfo">
                {/*<img src={data.user?.photoURL}/>*/}
                {/*<span>{data.user?.displayName}</span>*/}
                <div className="ChatIcons">
                    <img src={data.user?.photoURL}/>
                    <span>{data.user?.displayName}</span>

                </div>
            </div>
            <Messages />
            <InputPanel/>
        </div>
    );
};

export default Chat;