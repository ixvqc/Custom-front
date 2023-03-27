import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Main.css';
import auto from "../assets/img/car.png";
import key from "../assets/img/car-key.png";
import moto from "../assets/img/motorbike.png";
import car1 from "../assets/img/car1.jpg";
import car2 from "../assets/img/car2.jpg";
import car3 from "../assets/img/car3.jpg";


function Main() {

    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };
    const buttonColor = isHovered ? '#fdd852' : '#FDCF28';

    return (
        <div className="main">
            <div className="nav">
                <Link to={"/login"} className="link">
                    Zaloguj się
                </Link>
                <Link to={"/register"} className="link">
                        Rejestracja
                </Link>
                <button className="add-adv"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                style={{ backgroundColor: buttonColor }}>
                    <Link to={"/login"} className="link">Dodaj ogłoszenie + </Link>
                </button>

            </div>

            <div className="image_background">
                <div className="filters">
                    <div className="choice">
                        <img src={auto} className="choices_logo"/>
                        <img src={moto} className="choices_moto"/>
                        <img src={key} className="choices_key"/><br/>
                        <text className="text_choices"> Osobowe</text>
                        <text className="text_choices">Motocykle </text>
                        <text className="text_choices">Inne </text>
                    </div>
                    <div className="input">
               <label className="radio">
                    <input type="radio"  value="new" name="criteria_is.new" /> Nowe
               </label>
               <label className="radio">
                    <input type="radio" value="used" name="criteria_is.new" /> Używane
               </label>
               <label className="radio">
                    <input type="radio" value="all_car" name="criteria_is.new" defaultChecked={true}/> Wszystkie
               </label><br/>
                    </div>

                    <input
                        type="brand"
                        className="car_information"
                        placeholder="Dowolna marka"/>
                    <input
                        type="model"
                        className="car_information"
                        placeholder="Dowolny model"/>
                    <input
                        type="year_since"
                        className="car_year"
                        placeholder="Rok od"/>
                    <input
                        type="year_to"
                        className="car_year"
                        placeholder="Rok do"/>
                    <input
                        type="price_since"
                        className="car_price"
                        placeholder="Cena od"/>
                    <input
                        type="price_to"
                        className="car_price"
                        placeholder="Cena do"/>

                    <div className="input">
                        <label className="radio">
                            <input type="radio"  value="fuel" name="fuel_type" /> Benzyna
                        </label>
                        <label className="radio">
                            <input type="radio" value="diesel" name="fuel_type" /> Diesel
                        </label>
                        <label className="radio">
                            <input type="radio" value="all_type" name="fuel_type" defaultChecked={true}/> Wszystkie
                        </label><br/>
                    </div>
                    <Link to={"/login"} className="detailed_search">
                        Szczegółowe wyszukiwanie
                    </Link>
                    <button className="search"
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHover}
                            style={{ backgroundColor: buttonColor }}>
                        <Link to={"/login"} className="link">Szukaj</Link>
                    </button>
                </div>
            </div>
            <text className="popular_offert">Najpopularniejsze oferty </text>


            <div className="offer_main">
                <article className="cars_homepage">
                    <a className="cars">
                        <img src={car1} className="car1"/>
                        <text className="name_car">
                            Mustang
                        </text>
                    </a>

                    <a className="cars">
                        <img src={car2} className="car1"/>
                        <text className="name_car">
                            Skoda
                        </text>
                    </a>

                    <a className="cars">
                        <img src={car3} className="car1"/>
                        <text className="name_car">
                            Nissan +
                        </text>
                    </a>

                </article>






            </div>
        </div>


        );
}

export default Main;
