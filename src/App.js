import './App.css';
import Main from './views/Main'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './views/Login'
import Register from "./views/Register";
import Profile from "./views/Profile";
import Messages from "./views/Messages";
import useToken from './useToken'
import User from "./views/user";

function App() {
    const { token, removeToken, setToken } = useToken();


    return (

        <Routes>
            <Route path="/" element = {<Main/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/Register" element = {<Register/>}/>
            <Route path="/Profile" element = {<Profile/>}/>
            <Route path="/Messages" element = {<Messages/>}/>
            <Route path="/user" element = {<User/>}/>

        </Routes>


    );
}

export default App;
