import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Login.css';
import logo from '../assets/img/logov2.png';
import axios from "axios";
import React, { useRef } from "react";
import {firestore} from "../firebase";
import {addDoc,collection} from "@firebase/firestore";
import {storage} from "../firebase";
import {ref, uploadBytes, listAll,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";
import SignIn  from "../components/SignIn";
import ChatBox from "../components/ChatBox";

function Login(props) {


    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);

    const  imageListRef = ref(storage, "images/")
    const  uploadImage = () => {
        if (imageUpload == null)return;
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snaphsot)=>{
            getDownloadURL(snaphsot.ref).then((url)=>{
                setImageList((prev) => [...prev, url]);
            });
        });
    };

    useEffect(() => {
        listAll(imageListRef).then((response)=>{
            response.items.forEach((item) =>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev,url]);
                });
            })
        })
    }, []);

    const messageRef = useRef();
    const refFirestore= collection(firestore,"Client");
    const handleSave = async(e)=>{
        e.preventDefault();
        console.log(messageRef.current.value);

        let data = {
            Name:messageRef.current.value,
        }

        try{
            addDoc(refFirestore,data);
        }catch (e){
            console.log(e);
        }

    }



    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
    })

    function logMeIn(event) {
        axios({
            method: "POST",
            url:"/adddb",
            data:{
                email: loginForm.email,
                password: loginForm.password
            }
        })
            .then((response) => {
                props.setToken(response.data.access_token)
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
            })

        setloginForm(({
            email: "",
            password: ""}))

        event.preventDefault()
    }

    function handleChange(event) {
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}

    const [name, setName] = useState('Hubert')
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    const buttonColor = isHovered ? '#fdd852' : '#FDCF28';


    useEffect(() => {
        console.log('dupa')
    }, [name])
    return (
        <div className="background-login">

            <nav className="logo-container">
                <a href="http://localhost:3000">
                    <img src={logo} alt="Main.js Logo" className="logo_login" />
                </a>
            </nav>
            <div className="login-background">

            <div className="login-text">
                Zaloguj się
            </div>
        <form className="login-form">
            <div className="email-container-login">

                <input
                    onChange={handleChange}
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    type="email"
                    text={loginForm.email}
                    name="email"
                    className="email-input-login"
                    placeholder="Podaj maila"
                    value={loginForm.email}
                />
            </div>

            <div className="password-container-login">

                <input
                    onChange={handleChange}
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    type="password"
                    text={loginForm.password}
                    name="password"
                    className="password-input-login"
                    placeholder="Podaj hasło"
                    value={loginForm.password}
                />
            </div>

            <button className="button-login"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                    onClick={logMeIn}
                    style={{ backgroundColor: buttonColor }}>
                Zaloguj się
            </button>


            <a href="http://localhost:3000" className="text-no-password-login">
                Nie pamiętam hasła
            </a>
            <div className="for-register-login">
                <a className="text-register-login">
                Nie masz jeszcze konta?
                </a>
                <a href="http://localhost:3000/register" className="text-toregister-login">
                    Zarejestruj się
                </a>
            </div>


        </form>
                {/*<form onSubmit={handleSave}>*/}
                {/*    <label>Tu cos</label>*/}
                {/*    <input type="text" ref={messageRef} />*/}
                {/*    <button type="submit" >Send</button>*/}
                {/*</form>*/}
                {/*<input type="file" onChange={(event) => {*/}
                {/*    setImageUpload(event.target.files[0]);*/}
                {/*}}/>*/}
                {/*<button onClick={uploadImage} > Upload Image </button>*/}

                {/*{imageList.map((url)=>{*/}
                {/*    return <img src={url} className="TestFirebase"/>*/}
                {/*})}*/}


                    <SignIn />
        </div>
        </div>

    );
}

export default Login;