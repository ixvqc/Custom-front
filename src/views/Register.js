import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Register.css';
import logo from '../assets/img/logov2.png';
import axios from "axios";
import PasswordStrengthBar from 'react-password-strength-bar';
import Notiflix from 'notiflix';


function Register(props) {


    const [registerForm, setregisterForm] = useState({
        email: "",
        username: "",
        password: "",
        repassword: ""
    })

    const [name, setName] = useState('Hubert')
    const [isHovered, setIsHovered] = useState(false);
    const [PasswordIsOk, setPasswordIsOk] = useState(true)

    function handleClick (event)  {
        axios({
            method: "POST",
            url:"/testowanko",
            data:{
                email: registerForm.email,
                username: registerForm.username,
                password: registerForm.password,
                repassword: registerForm.repassword
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

        setregisterForm(({
            email: "",
            username: "",
            password: "",
            repassword: ""}))

        event.preventDefault()
    }

    function handleChange(event) {
        const {value, name} = event.target
        setregisterForm(prevNote => ({
            ...prevNote, [name]: value})
        )}

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    const validatePasswords = () => {
        if(registerForm.password === registerForm.repassword){
            handleClick()
            Notiflix.Notify.success('Konto zostało utworzone');
        }

    };

    const buttonColor = isHovered ? '#fdd852' : '#FDCF28';


    useEffect(() => {
        console.log('xxx')
        let  passw=  /.[a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;
        if(registerForm.password.match(passw) && (registerForm.password === registerForm.repassword)){
            setPasswordIsOk(false)
        }
        else {
            setPasswordIsOk(true)

        }




    }, [registerForm.password,registerForm.repassword])

    return (
        <div className="tlo-Register">

            <nav className="logo-container">
                <a href="http://localhost:3000">
                    <img src={logo} alt="Main.js Logo" className="logo_register" />
                </a>
            </nav>

            <div className="login-text">
                Zarejestruj się
            </div>

            <form className="register-form">

            <div className="email-container">

                <input
                    onChange={handleChange}
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    name="email"
                    type="email"
                    text={registerForm.email}
                    className="email-input"
                    placeholder="E-Mail"

                />
            </div>
            <div className="username-container">

                <input
                    onChange={handleChange}
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    name="username"
                    type="username"
                    text={registerForm.username}
                    className="username-input"
                    placeholder="Nazwa Użytkownika"

                />
            </div>

            <div className="password-container">
                <input
                    onChange={handleChange}
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    name="password"
                    type="password"
                    text={registerForm.password}
                    className="password-input"
                    placeholder="Podaj hasło"
                />

               {registerForm.password.length > 0 && (
                    <PasswordStrengthBar password={registerForm.password} className="password-bar-register"/>
                    )
                }

            </div>
            <div className="repassword-container">

                <input
                    onChange={handleChange}
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    name="repassword"
                    type="password"
                    text={registerForm.repassword}
                    className="repassword-input"
                    placeholder="Powtórz hasło"

                />

            </div>


            <button className="button-register"
                    onMouseEnter={handleHover}
                    disabled={PasswordIsOk}
                    onMouseLeave={handleHover}
                    onClick={()=>{validatePasswords()}}
                    style={{ backgroundColor: buttonColor}}>

                Zarejestruj się
            </button>




            <a  className="text-no-password1">
                Masz już konto?
            </a>


            <a href="http://localhost:3000/login" className="text-no-password">

                Zaloguj się
            </a>
            </form>
        </div>

    );
}

export default Register;