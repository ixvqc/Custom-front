import './App.css';
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import Home from "./views/Home";
import Mess from "./views/Mess";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import AddAnnouncement from "./views/AddAnnouncement";
import Messages from "./views/Messages";
import useToken from './useToken'
import Search from './views/Search'
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
    const { currentUser } = useContext(AuthContext);
    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children
    };

return (
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="mess" element={<Mess />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/Profile" element = {<Profile/>}/>
                <Route path="/AddAnnouncement" element = {<AddAnnouncement/>}/>
                <Route path="/Messages" element = {<Messages/>}/>
                <Route path="/Search" element = {<Search/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);
}

export default App;
