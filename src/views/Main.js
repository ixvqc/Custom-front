import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Main.css';

function Main() {

    return (
        <div className="main">
            <div className="nav">
                <Link to={"/login"} className="link">
                    Zaloguj się
                </Link>
                <Link to={"/register"} className="link">
                        Rejestracja
                </Link>
                <Link to={"/advertisment"} className="link">
                    Dodaj ogłoszenie
                </Link>
            </div>
        </div>


        );
}

export default Main;
