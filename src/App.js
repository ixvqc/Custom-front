import './App.css';
import Main from './views/Main'
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import Login from './views/Login'
import Register from "./views/Register";
import Profile from "./views/Profile";
import AddAnnouncement from "./views/AddAnnouncement";
import Messages from "./views/Messages";
import useToken from './useToken'
import { auth } from "./firebase";
import SignIn from './components/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth'
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import LoginMain from './views/LoginMain'
// import User from "./views/user";
import Search from "./views/Search";



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
            <Route path="/AddAnnouncement" element = {<AddAnnouncement/>}/>
            <Route path="/Messages" element = {<Messages/>}/>
            {/*<Route path="/user" element = {<User/>}/>*/}
            <Route path="/LoginMain" element = {<LoginMain/>}/>
            <Route path="/Search" element = {<Search/>}/>

        </Routes>


    );
}

export default App;
