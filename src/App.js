import './App.css';
import Main from './views/Main'
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import Login from './views/Login'
import Register from "./views/Register";
import Profile from "./views/Profile";
import Messages from "./views/Messages";
import useToken from './useToken'
import { auth } from "./firebase";
import SignIn from './components/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth'
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";




function App() {
    const { token, removeToken, setToken } = useToken();
    const [user] = useAuthState(auth)
    const [room, setRoom] = useState("");
    const {currentUser} = useContext(AuthContext)
    const ProtectedRoute = ({children}) => {
        if(!currentUser){
            return <Navigate to="/Login"/>
        }
        return children
    };

    return (

        <Routes>
            <Route index element={
                <ProtectedRoute>
                    <Main />
                </ProtectedRoute>
              }
            />
            <Route path="/" element = {<Main/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/Register" element = {<Register/>}/>
            <Route path="/Profile" element = {<Profile/>}/>
            <Route path="/Messages" element = {<Messages/>}/>


        </Routes>


    );
}

export default App;
