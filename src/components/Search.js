import React from "react";
import '../styles/messages.css';
const Search = () => {
    return(
        <div className="search-msg">
            <div className="SearchForm-msg">
                <input type="text" placeholder="Znajdź użytkownika"/>
                </div>
            <div className="UserChat-msg">
                <img src="https://1.bp.blogspot.com/-1pngFjQZ9WQ/VescNYCPvUI/AAAAAAAAGT8/PpVP3NlrLLY/s1600/Jamnik_5.jpg" alt="" />
                <div className="UserChatInfo">
                    <span>Julia</span>
                </div>
            </div>
        </div>
    )
}
export default Search