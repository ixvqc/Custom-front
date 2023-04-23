import {useNavigate,Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Search.css';
import logo from '../assets/img/logov2.png';
import axios from "axios";
import React, { useRef } from "react";
import {firestore} from "../firebase";
import {addDoc,collection} from "@firebase/firestore";
import {storage} from "../firebase";
import {ref, uploadBytes, listAll,getDownloadURL} from "firebase/storage";
import ChatBox from "../components/ChatBox";
import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "../firebase";
import auto from "../assets/img/car.png";
import autoHighlights from "../assets/img/carHighlights.png";
import moto from "../assets/img/motorbike.png";
import motoHighlights from "../assets/img/motorbikeHighlights.png";
import key from "../assets/img/car-key.png";
import keyHighlights from "../assets/img/car-keyHighlights.png";
import {CSSTransition} from "react-transition-group";

const search = () => {
    //const [err, setErr] = useState(false);
    //const navigate = useNavigate();

    return (
        <div className="background-search">

            <div className="nav">


                <div className="logo-div">
                    <a href="http://localhost:3000">
                        <img src={logo} className="logo-main"/>
                    </a>

                </div>

                <Link to={"/login"} className="link">
                    Zaloguj się
                </Link>
                <Link to={"/register"} className="link">
                    Rejestracja
                </Link>
                <Link to={"/messages"} className="link">
                    wiadomości
                </Link>

                <button onClick={() => signOut(auth)}>logout</button>

                <button className="add-adv"
                >
                    <Link to={"/login"} className="link">Dodaj ogłoszenie + </Link>
                </button>

            </div>


            <div className="search-background">

                <form>
                    <div className="foreground">
                        <div className="search-text">
                            Wyszukaj ogłoszenie
                        </div>
                                <div>
                                    <div className="input">
                                        <label className="radio">
                                            <input type="radio" value="new" name="criteria-is.new"/> Nowe
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="used" name="criteria-is.new"/> Używane
                                        </label>
                                        <label className="radio">
                                            <input
                                                type="radio"
                                                value="all-cars"
                                                name="criteria-is.new"
                                                defaultChecked={true}
                                            />{" "}
                                            Wszystkie
                                        </label>
                                        <br/>
                                    </div>

                                    <input type="text" className={"car-info"} name="car-brand" placeholder="Dowolna marka"/>
                                    <input type="text" className={"car-info"} name="car-model" placeholder="Dowolny model"/>
                                    <input type="text" className={"car-info"} name="car-year-from" placeholder="Rok od"/>
                                    <input type="text" className={"car-info"} name="car-year-to" placeholder="Rok do"/>
                                    <input type="text" className={"car-info"} name="car-price-from" placeholder="Cena od"/>
                                    <input type="text" className={"car-info"} name="car-price-to" placeholder="Cena do"/>
                                    <input type="text" className={"car-info"} name="car-country" placeholder="Kraj pochodzenia"/>
                                    <select className={"car-info"} name="car-body">
                                        <option value="Dowolne">Dowolne nadwozie</option>
                                        <option value="Hatchback">Hatchback</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Liftback">Liftback</option>
                                        <option value="Kombi">Kombi</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Crossover">Crossover</option>
                                        <option value="Kabriolet">Kabriolet</option>
                                        <option value="Coupe">Coupe</option>
                                        <option value="Roadster">Roadster</option>
                                        <option value="Pick-up">Pick-up</option>
                                    </select>

                                    <input type="text" className={"car-info"} name="car-mileage-from" placeholder="Przebieg od"/>
                                    <input type="text" className={"car-info"} name="car-mileage-to" placeholder="Przebieg do"/>

                                    <div className="input">
                                        <label className="radio">
                                            <input type="radio" value="fuel" name="fuel_type"/> Benzyna
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="diesel" name="fuel_type"/> Diesel
                                        </label>
                                        <label className="radio">
                                            <input
                                                type="radio"
                                                value="all_type"
                                                name="fuel_type"
                                                defaultChecked={true}
                                            />{" "}
                                            Wszystkie
                                        </label>
                                        <br/>
                                    </div>
                                    <button className="search">
                                        <Link to={"/login"} className="link">
                                            Szukaj
                                        </Link>
                                    </button>
                                </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default search;