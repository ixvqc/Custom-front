import React, { useState } from "react";
import {useEffect} from "react";
import '../styles/Register.css';
import Add from "../img/addAvatar.png";
import logo from '../assets/img/logov2.png';
import Notiflix from 'notiflix';
import PasswordChecklist from "react-password-checklist"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useReducer } from 'react';

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
      <div className="tlo-Register">

        <nav className="logo-container">
          <a href="/">
            <img src={logo} alt="Main.js Logo" className="logo_register"/>
          </a>
        </nav>
        <div className="register-background">
          <div className="register-text">
            <span className="title">Zarejestruj się</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="username-container-register">
              <input required type="text" placeholder="nazwa użytkownika"
                     className="email-input-register"
              />
            </div>
            <div className="email-container-register">
              <input required type="email" placeholder="email"
                     className="email-input-register"
              />
            </div>
            <div className="password-container">
              <input required type="password" placeholder="hasło"
                     className="password-input-register" onChange={e => setPassword(e.target.value)}

              />
              <PasswordChecklist
                  rules={["minLength","specialChar","number","capital"]}
                  minLength={8}
                  value={password}
                  messages={{
                    minLength: "Hasło ma więcej niż 8 znaków.",
                    specialChar: "Hasło posiada znaki specjalne .",
                    number: "Hasło zawiera cyfry",
                    capital: "Hasło ma wielką literę.",
                  }}
              />


            </div>
            <input required style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <div className="Add-avatar-register">
                <button className="button-add-avatar-register">Dodaj zdjęcie</button>
              </div>
            </label>
            <button className="button-register" disabled={loading}> Zarejestruj się</button>
            {loading && "Poczekaj chwilę "}
            {err && <span>Coś poszło nie tak</span>}

          </form>
          <p className="text-no-password1">
            Masz już konto? <Link to="/login" className="text-no-password">Zaloguj się</Link>
          </p>
        </div>
      </div>
  );
};


export default Register;
