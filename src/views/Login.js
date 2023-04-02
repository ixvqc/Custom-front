import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Login.css';
import logo from '../assets/img/logov2.png';

function Login() {

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


            <form>
                <div className="email-container">

                    <input
                        style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                        type="email"
                        className="email-input"
                        placeholder="Email"
                    />
                </div>

                <div className="password-container">

                    <input
                        style={{border: '2px solid rgba(0, 0, 0, 0.31)'}}
                        type="password"
                        className="password-input"
                        placeholder="Hasło"
                    />
                </div>

                <button className="button-login"
                        onMouseEnter={handleHover}
                        onMouseLeave={handleHover}
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