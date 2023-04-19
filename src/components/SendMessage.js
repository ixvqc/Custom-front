import React, { useState } from 'react'
import { db, auth, app } from '../firebase'
import { collection,addDoc,query,limit, serverTimestamp, orderBy} from "firebase/firestore";
import '../styles/messages.css';

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')
    const messagesRef = collection(db, "messages");




    const sendMsg = async (e) => {
        const { uid, photoURL } = auth.currentUser


        await addDoc(messagesRef, {
            text: msg,
            createdAt: serverTimestamp(),
            uid: uid,
            photoURL: photoURL
        })
        setMsg('');


    };

    return (
        <div className="send-button">

            <div className="sendMsg">
                <input className="input-text-msg" placeholder='Message...'
                       type="text" value={msg}
                       onChange={(e) => setMsg(e.target.value)} />

                    <button  className="button-send-msg" type="submit"
                             onClick={sendMsg}>Send</button>
                </div>


        </div>
    )
}

export default SendMessage