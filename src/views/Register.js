import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Register.css';
import logo from '../assets/img/logov2.png';
import axios from "axios";
import Notiflix from 'notiflix';
import PasswordChecklist from "react-password-checklist"

import React, { useReducer } from 'react';

function Register(props) {


    const [registerForm, setregisterForm] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
        email: "",
        username: "",
        password: "",
        repassword: ""
        },
        );

    const { email, password } = registerForm;

    const handleInputChange = (e) => {
        registerForm({
            [e.target.name]: e.target.value,
        });
    };
    //
    // const handleSignIn = (e) => {
    //     e.preventDefault();
    //     auth
    //         .signInWithEmailAndPassword(email, password)
    //         .catch((error) =>
    //             alert(`Your email or password is incorrect, please check your data, ${error}`),
    //         );
    // };
    // const handleSignUp = (e) => {
    //     e.preventDefault();
    //     auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .catch((error) => alert(`Email is already in use, sign in or use other email, ${error}`));
    // };
    //

    const [name, setName] = useState('Hubert')
        const [isHovered, setIsHovered] = useState(false);
        const [PasswordIsOk, setPasswordIsOk] = useState(true)



        //
        //
        // function handleClick(event) {
        //     axios({
        //         method: "POST",
        //         url: "/testowanko",
        //         data: {
        //             email: registerForm.email,
        //             username: registerForm.username,
        //             password: registerForm.password,
        //             repassword: registerForm.repassword
        //         }
        //     })
        //         .then((response) => {
        //             props.setToken(response.data.access_token)
        //             Notiflix.Notify.success('Konto zostało utworzone');
        //
        //         }).catch((error) => {
        //             Notiflix.Notify.failure('Konto nie zostało utworzone');
        //             if (error.response) {
        //                 console.log(error.response)
        //                 console.log(error.response.status)
        //                 console.log(error.response.headers)
        //             }
        //     })
        //
        //     setregisterForm(({
        //         email: "",
        //         username: "",
        //         password: "",
        //         repassword: ""
        //     }))
        //
        //     event.preventDefault()
        //
        // }

        function handleChange(event) {
            const {value, name} = event.target
            setregisterForm(prevNote => ({
                    ...prevNote, [name]: value
                })
            )


        }

        const handleHover = () => {
            setIsHovered(!isHovered);
        };


        const buttonColor = isHovered ? '#fdd852' : '#FDCF28';


        useEffect(() => {
            console.log('validate password')
            let passw = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
            if (registerForm.password.match(passw) && (registerForm.password === registerForm.repassword)) {
                setPasswordIsOk(false)

            } else {
                setPasswordIsOk(true)

            }


        }, [registerForm.password, registerForm.repassword])

        return (
            <div className="tlo-Register">

                <nav className="logo-container">
                    <a href="http://localhost:3000">
                        <img src={logo} alt="Main.js Logo" className="logo_register"/>
                    </a>
                </nav>
            <div className="register-background">


                <div className="register-text">
                    Zarejestruj się
                </div>

                <form className="register-form">

                    <div className="email-container-register">

                        <input
                            name="email"
                            type="email"
                            text={registerForm.email}
                            className="email-input-register"
                            placeholder="E-Mail"
                            required
                            onChange={handleInputChange}
                            value={email}

                        />
                    </div>
                    <div className="username-container-register">

                        <input
                            onChange={handleChange}
                            name="username"
                            type="username"
                            text={registerForm.username}
                            className="username-input-register"
                            placeholder="Nazwa Użytkownika"
                            required


                        />
                    </div>

                    <div className="password-container">
                        <input

                            name="password"
                            type="password"
                            text={registerForm.password}
                            className="password-input-register"
                            placeholder="Podaj hasło"
                            required
                            onChange={handleInputChange}
                            value={password}

                        />

                        { registerForm.password.length > 0 &&
                            <PasswordChecklist
                            rules={["minLength","specialChar","number","capital","match"]}
                            minLength={8}
                            value={registerForm.password}
                            valueAgain={registerForm.repassword}
                            messages={{
                                minLength: "Hasło ma więcej niż 8 znaków.",
                                specialChar: "Hasło posiada znaki specjalne .",
                                number: "Hasło zawiera cyfry",
                                capital: "Hasło ma wielką literę.",
                                match: "Hasła są takie same.",
                            }}
                        />
                        }

                    </div>
                    <div className="repassword-container">

                        <input
                            onChange={handleChange}
                            name="repassword"
                            type="password"
                            text={registerForm.repassword}
                            className="repassword-input-register"
                            placeholder="Powtórz hasło"
                            required


                        />

                    </div>


                    <button className="button-register"
                            onMouseEnter={handleHover}
                            disabled={PasswordIsOk}
                            onMouseLeave={handleHover}
                            // onClick={}
                            style={{backgroundColor: buttonColor}}>

                        Zarejestruj się
                    </button>


                    <a className="text-no-password1">
                        Masz już konto?
                    </a>


                    <a href="http://localhost:3000/login" className="text-no-password">

                        Zaloguj się
                    </a>
                </form>
            </div>
            </div>

        );
    }

export default Register;