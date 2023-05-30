import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import '../styles/messages.css';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat-messages">
      <div className="ChatInfo">
        <div className="ChatIcons">
            <img src={data.user?.photoURL}/>
            <span>{data.user?.displayName}</span>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
