import React, { useContext, useState } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import '../styles/messages.css';
const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId = currentUser.uid > user.uid
            ? currentUser.uid
            + user.uid
            : user.uid + currentUser.uid;
        try{
            //create a chat in chats collection
            const res = await getDoc(doc(db, "chats", combinedId));
            if(!res.exists()){
                await setDoc(doc(db,"chats",combinedId),{messages: []});
            //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch(err) {}



    };
    return(
        <div className="search-msg">
            <div className="SearchForm-msg">
                <input type="text"
                       placeholder="Znajdź użytkownika"
                       onChange={(e) => setUsername(e.target.value)}
                       onKeyDown={handleKey}
                       value={username}
                />
                </div>
            {err && <span>Użytkownik nie znaleziony!</span>}
            {user &&  (
            <div className="UserChat-msg" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="UserChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>
            )}
        </div>
    )
}
export default Search