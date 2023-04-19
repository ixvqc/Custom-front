import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../firebase'
import SendMessage from './SendMessage'
import { collection, query,limit, orderBy, onSnapshot,serverTimestamp,where,addDoc} from "firebase/firestore";
import '../styles/messages.css';



function Chat() {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, "messages");
    const { userID } = auth.currentUser
    const [room, setRoom] = useState("");


    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt"),
            limit(50)
        );

        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
            QuerySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages)

        });

        return () => data;

    }, []);

    return (
        <div>
            {/*<button*/}
            {/*    onClick={() => auth.signOut()}*/}
            {/*    style={{ width: '100%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }}*/}


            {/*>Sign Out</button>*/}
            <div className="msgs">


                {messages && messages.map((message, id, uid, photoURL) =>
                    <div>
                        <div key={id} className={`msg ${userID === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            {/*<img  className="avatar" src={message.photoURL} />*/}
                            <p className="p-msg">{message.text}</p>

                        </div>
                    </div>
                )}
            </div>


            <SendMessage />

        </div>
    )
}

export default Chat