import {useNavigate,Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Search.css';
import logo from '../assets/img/logov2.png';
import React, { useRef } from "react";
import { db } from "../firebase"
import {getDocs, collection, doc, query, where, limit} from "@firebase/firestore";
import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "../firebase";
import {getWindowFromNode} from "@testing-library/dom/dist/helpers";



function Search()  {
    const [carList,setCarList] = useState([]);
    const carCollectionRef = collection(db, "Search-test");
    const [visibility, setVisibility] = useState(false)

    const handleClick = () => {
        setVisibility(!visibility);
    }

    // useEffect(() => {
    //     const q = query(
    //         carCollectionRef,
    //         // where('Model', '=='
    // }




    useEffect(() => {
    const getCarList = async () => {
        try{
            const data = await getDocs(carCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log(filteredData);
            setCarList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    getCarList();
    },[]);



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
                            <div className={"search-inputs"}>
                                    <input type="text" className={"car-info"} name="car-brand" placeholder="Dowolna marka"/>
                                    <input type="text" className={"car-info"} name="car-model" placeholder="Dowolny model"/>

                                    <div className={"input-float"}>
                                    <input type="number" className={"car-info"} id = "car-year-1" name="car-year-from" placeholder="Rok od"/>
                                    <input type="number" className={"car-info"} id = "car-year-2" name="car-year-to" placeholder="Rok do"/>
                                    </div>

                                    <div className={"input-float"}>
                                    <input type="number" className={"car-info"} id = "car-price-1" name="car-price-from" placeholder="Cena od"/>
                                    <input type="number" className={"car-info"} id = "car-price-2" name="car-price-to" placeholder="Cena do"/>
                                    </div>

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

                                    <div className={"input-float"}>
                                    <input type="number" className={"car-info"} id = "car-mileage-1" name="car-mileage-from" placeholder="Przebieg od"/>
                                    <input type="number" className={"car-info"} id = "car-mileage-2" name="car-mileage-to" placeholder="Przebieg do"/>
                                    </div>

                                    <input type="text" className={"car-info"} name="car-localization" placeholder="Dowolna lokalizacja"/>
                                    <input type="text" className={"car-info"} name="car-repairable" placeholder="Dowolny stan"/>
                                    <input type="text" className={"car-info"} name="car-engine" placeholder="Dowolny silnik"/>
                                    <input type="text" className={"car-info"} name="car-inventory" placeholder="Dowolne wyposażenie"/>

                                    <select className={"car-info"} name="car-fuel">
                                        <option value="Dowolne">Dowolne paliwo</option>
                                        <option value="Benzyna">Hatchback</option>
                                        <option value="Gaz">Sedan</option>
                                        <option value="Elektryczne">Sedan</option>
                                        <option value="Hybryda">Sedan</option>
                                        <option value="Inne">Sedan</option>
                                    </select>


                                    <button className="search-button" type = "button" onClick={handleClick}>
                                            Szukaj
                                    </button>

                                    <div style ={{display: visibility ? 'block' : 'none'}}>
                                        {carList.map((car) => (
                                            <div className={"search-offer"}>
                                                <div className={"search-offer-image"}>
                                                    <img id = "car-image" src={car.Zdje}/>
                                                </div>
                                                <div className={"search-offer-data"}>
                                                    <div>
                                                        <h1>{car.Marka}</h1>
                                                        <p>{car.Model}</p>
                                                    </div>
                                                    <div>
                                                        <p>Kraj pochodzenia: {car.Kraj}</p>
                                                        <p>Lokalizacja {car.Lokalizacja}</p>
                                                    </div>
                                                    <div>
                                                        <p>Typ nadwozia: {car.Nadwozie}</p>
                                                        <p>Paliwo: {car.Paliwo}</p>
                                                    </div>
                                                    <div>
                                                        <p>Rok produkcji: {car.Rok}</p>
                                                        <p>Cena: {car.Cena}</p>
                                                    </div>
                                                    <div>
                                                        <p>Przebieg: {car.Przebieg}</p>
                                                        <p>Stan pojazdu: {car.Stan}</p>
                                                    </div>
                                                    <div>
                                                        <p>Silnik: {car.Silnik}</p>
                                                        <p>Wyposażenie dodatkowe: {car.Wypos}</p>
                                                    </div>
                                                </div>


                                            </div>
                                        ))}
                                    </div>

                                </div>

                    </div>
                </form>
            </div>
        </div>

    );
}

export default Search;