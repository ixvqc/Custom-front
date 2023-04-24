import React from "react";
import Img from "../assets/img/img.png"
import Attach from "../assets/img/attach.png"
const InputPanel = () => {
    return(
        <div className="inputpanel-component">
            <input type="text" placeholder="Napisz wiadomość"/>
            <div className="send-button-inputpanel">
                <img src={Attach}alt=""/>
                <input type="file" style={{display:"none"}} id="file" />
                <label htmlFor="file">
                    <img src={Img} alt=""/>
                </label>
                <button > Wyślij</button>
            </div>
        </div>
    )
}
export default InputPanel