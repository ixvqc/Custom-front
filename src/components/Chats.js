import React from "react";
import '../styles/messages.css';
import user from "../assets/img/user.png"

const Chats = () => {
    return(
        <div className="chats-messages">
            <div className="UserChat-msg">
                <img src="https://1.bp.blogspot.com/-1pngFjQZ9WQ/VescNYCPvUI/AAAAAAAAGT8/PpVP3NlrLLY/s1600/Jamnik_5.jpg" alt="" />
                <div className="UserChatInfo">
                    <span>Julia</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="UserChat-msg">
                <img src={user} alt="" />
                <div className="UserChatInfo">
                    <span>Julia</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="UserChat-msg">
                <img src="https://1.bp.blogspot.com/-1pngFjQZ9WQ/VescNYCPvUI/AAAAAAAAGT8/PpVP3NlrLLY/s1600/Jamnik_5.jpg" alt="" />
                <div className="UserChatInfo">
                    <span>Julia</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>


    )
}
export default Chats