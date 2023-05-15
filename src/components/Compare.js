import React, { useContext,useEffect,useState } from 'react'
import '../styles/Compare.css';
import logo from "../assets/img/logov2.png";
import {Link} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";

const Compare = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem('compare'));
        setCars(temp);
    }, []);



    function delateCompare(obj) {
        localStorage.removeItem('compare');
    }

    return (


        <div className="nav-compare">

            <div className="navbar-compare">
            <div className="nav-search-compare">
                <div className="logo-div-search">
                    <a href="http://localhost:3000">
                        <img src={logo} className="logo-search"/>
                    </a>

                </div>

                <Link to={"/user"} className="link-search-compare">
                    Moje konto
                </Link>
                <Link to={"/messages"} className="link-search-compare">
                    wiadomości
                </Link>

                <button className="logout-button" onClick={() => signOut(auth)}>logout</button>

                <button className="add-adv-search-compare">
                    <Link to={"/login"} className="link-search-compare">Dodaj ogłoszenie + </Link>
                </button>
            </div>
            </div>
            <div className="comparison">
                <div className="compare-window-first">


                    {Array.isArray(cars) &&
                        cars.map((car, index) => (
                            <tr key={index}>

                                <img className="img-compare" src={car.Zdje}/>
                                <td>Marka:{car.Marka}</td>
                                <td>Model:{car.Model}</td>
                                <td>Paliwo:{car.Paliwo}</td>
                                <td> Rok: {car.Rok}</td>
                                <td>Cena: {car.Cena}</td>
                                <td>Przebieg: {car.Przebieg}</td>

                                <button
                                    onClick={()=> delateCompare(car)}
                                >
                                    <p>Usuń</p>
                                </button>

                            </tr>
                        ))}
                </div>


            </div>


            </div>
    )

}

export default Compare;