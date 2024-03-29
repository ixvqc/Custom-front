import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/Login.css';
import logo from '../assets/img/logov2.png';
import { auth } from "../firebase";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
      NotificationManager.error('Niepoprawne hasło', 'Błąd');
    }
  };

  return (
      <div className="background-login">
        <nav className="logo-container">
          <a href="/">
            <img src={logo} alt="Main.js Logo" className="logo_login" />
          </a>
        </nav>
        <div className="login-background">
          <div className="login-text">
            Zaloguj się
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="email-container-login">
              <input
                  style={{ border: '2px solid rgba(0, 0, 0, 0.31)' }}
                  type="email"
                  name="email"
                  className="email-input-login"
                  placeholder="Podaj maila"
              />
            </div>
            <div className="password-container-login">
              <input
                  style={{ border: '2px solid rgba(0, 0, 0, 0.31)' }}
                  type="password"
                  name="password"
                  className="password-input-login"
                  placeholder="Podaj hasło"
              />
            </div>
            <button className="button-login">
              Zaloguj się
            </button>

            <a href="/ForgotPassword" className="text-no-password-login">
              Nie pamiętam hasła
            </a>
            <div className="for-register-login">
              <a className="text-register-login">
                Nie masz jeszcze konta?
              </a>
              <Link to="/register" className="text-toregister-login">
                Zarejestruj się
              </Link>
            </div>
          </form>
        </div>
        <NotificationContainer />
      </div>
  );
};

export default Login;
