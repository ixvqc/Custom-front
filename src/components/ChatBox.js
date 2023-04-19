import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../firebase'
import SendMessage from './SendMessage'
import { collection, query,limit, orderBy, onSnapshot} from "firebase/firestore";
import '../styles/messages.css';


function Chat() {
    const [messages, setMessages] = useState([])
    const { userID } = auth.currentUser
    const scroll = useRef();


    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt"),
            limit(50)
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
                            <img  className="avatar" src={message.photoURL} />
                            <p className="p-msg">{message.text}</p>

                        </div>
                    </div>
                )}
            </div>


            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />

        </div>
    )
}

export default Chat