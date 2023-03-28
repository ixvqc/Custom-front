import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Register.css';
import logo from '../assets/img/logo.png';

function Register() {

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
        <div className="tlo-Register">

            <nav className="logo-container">
                <a href="http://localhost:3000">
                    <img src={logo} alt="Main.js Logo" className="logo" />
                </a>
                <div className="custom"><a href="http://localhost:3000" className="custom-color" >Custom</a></div>
            </nav>

            <div className="login-text">
                Zaloguj się
            </div>

            <div className="email-container">

                <input
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    type="email"
                    className="email-input"
                    placeholder="E-Mail"

                />
            </div>
            <div className="username-container">

                <input
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    type="username"
                    className="username-input"
                    placeholder="Nazwa Użytkownika"

                />
            </div>

            <div className="password-container">

                <input
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    type="password"
                    className="password-input"
                    placeholder="Podaj hasło"
                />
            </div>
            <div className="repassword-container">

                <input
                    style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                    type="repassword"
                    className="repassword-input"
                    placeholder="Powtórz hasło"

                />
            </div>


            <button className="button-login"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                   style={{ backgroundColor: buttonColor}}>

                Zarejestruj się
            </button>


            <a  className="text-no-password1">
                Masz już konto?
            </a>


                <a href="http://localhost:3000/login" className="text-no-password">

                     Zaloguj się
                </a>

        </div>

    );
}

export default Register;
