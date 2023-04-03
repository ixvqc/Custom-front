import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Login.css';
import logo from '../assets/img/logov2.png';
import axios from "axios";

function Login(props) {

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

            <div className="login-text">
                Zaloguj się
            </div>
        <form className="login-form">
            <div className="email-container">

                <input
                    onChange={handleChange}
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    type="email"
                    text={loginForm.email}
                    name="email"
                    className="email-input"
                    placeholder="Podaj maila"
                    value={loginForm.email}
                />
            </div>

            <div className="password-container">

                <input
                    onChange={handleChange}
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    type="password"
                    text={loginForm.password}
                    name="password"
                    className="password-input"
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


            <a href="http://localhost:3000" className="text-no-password">
                Nie pamiętam hasła
            </a>

        </form>
            <div className="for-register">
                <a href="http://localhost:3000/register" className="text-no-password">
                    Nie masz jeszcze konta? Zarejestruj się
                </a>
            </div>
        </div>

    );
}

export default Login;