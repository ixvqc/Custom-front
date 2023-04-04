import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Main.css';
import auto from "../assets/img/car.png";
import key from "../assets/img/car-key.png";
import moto from "../assets/img/motorbike.png";
import car1 from "../assets/img/car1.jpg";
import car2 from "../assets/img/car2.jpg";
import car3 from "../assets/img/car3.jpg";
import logo from "../assets/img/logov2.png";
import axios from "axios";
import CarCard  from "../components/CarCard";


function Main(props) {


    function logMeOut() {
        axios({
            method: "POST",
            url:"/logout",
        })
            .then((response) => {
                props.token()
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })}


//BUTTON ADD OFFERT
//     const [isHovered, setIsHovered] = useState(false);
//
//     const handleHover = () => {
//         setIsHovered(!isHovered);
//     };
//     const buttonColor = isHovered ? '#fdd852' : '#FDCF28';

//CHANGE TYPE OF SEARCH  osobowe,motocykle,inne


    return (

        <div className="main">

            <div className="nav">

            <div className="logo-div">
                    <img src={logo} className="logo-main"/>

            </div>

                <button onClick={logMeOut}>
                    Logout
                </button>

            <Link to={"/login"} className="link">
                    Zaloguj się
                </Link>
                <Link to={"/register"} className="link">
                    Rejestracja
                </Link>
                <button className="add-adv"
                        // onMouseEnter={handleHover}
                        // onMouseLeave={handleHover}
                        // style={{ backgroundColor: buttonColor }}
                    >
                    <Link to={"/login"} className="link">Dodaj ogłoszenie + </Link>
                </button>

            </div>

            <div className="image-background">
                <div className="filters">
                    <div className="filters-line">
                        <img src={auto} className="choices-logo"/>
                        <img src={moto} className="choices-moto"/>
                        <img src={key} className="choices-key"/><br/>
                        <text className="text-choices"> Osobowe</text>
                        <text className="text-choices">Motocykle </text>
                        <text className="text-choices">Inne </text>
                    </div>
                    <div className="input">
                        <label className="radio">
                            <input type="radio"  value="new" name="criteria-is.new" /> Nowe
                        </label>
                        <label className="radio">
                            <input type="radio" value="used" name="criteria-is.new" /> Używane
                        </label>
                        <label className="radio">
                            <input type="radio" value="all-cars" name="criteria-is.new" defaultChecked={true}/> Wszystkie
                        </label><br/>
                    </div>

                    <input
                        type="text"
                        className="car-information"
                        placeholder="Dowolna marka"/>
                    <input
                        type="text"
                        className="car-information"
                        placeholder="Dowolny model"/>
                    <input
                        type="text"
                        className="car-year"
                        placeholder="Rok od"/>
                    <input
                        type="text"
                        className="car-year"
                        placeholder="Rok do"/>
                    <input
                        type="text"
                        className="car-price"
                        placeholder="Cena od"/>
                    <input
                        type="text"
                        className="car-price"
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
                    <Link to={"/login"} className="detailed-search">
                        Szczegółowe wyszukiwanie
                    </Link>
                    <button className="search"
                            // onMouseEnter={handleHover}
                            // onMouseLeave={handleHover}
                            // style={{ backgroundColor: buttonColor }}
                    >
                        <Link to={"/login"} className="link">Szukaj</Link>
                    </button>
                </div>
            </div>
            <text className="popular-offers-text">Najpopularniejsze oferty </text>


            <div className="popular-offers-homepage">
                  <CarCard
                    ImageCar={car1}
                    CarBrand={"Volvo"}
                    CarPrice={"132 382 zł"}
                    ProductionDate={"2012"}
                    CarMileage={"193 tys"}
                    FuelType={"diesel"}

                  />
                <CarCard
                    ImageCar={car1}
                    CarBrand={"Volvo"}
                    CarPrice={"132 382 zł"}
                    ProductionDate={"2012"}
                    CarMileage={"193 tys"}
                    FuelType={"diesel"}

                />
                <CarCard
                    ImageCar={car1}
                    CarBrand={"Volvo"}
                    CarPrice={"132 382 zł"}
                    ProductionDate={"2012"}
                    CarMileage={"193 tys"}
                    FuelType={"diesel"}

                />
                <CarCard
                    ImageCar={car1}
                    CarBrand={"Volvo"}
                    CarPrice={"132 382 zł"}
                    ProductionDate={"2012"}
                    CarMileage={"193 tys"}
                    FuelType={"diesel"}

                />
                <CarCard
                    ImageCar={car1}
                    CarBrand={"Volvo"}
                    CarPrice={"132 382 zł"}
                    ProductionDate={"2012"}
                    CarMileage={"193 tys"}
                    FuelType={"diesel"}

                />
                <CarCard
                    ImageCar={car1}
                    CarBrand={"Volvo"}
                    CarPrice={"132 382 zł"}
                    ProductionDate={"2012"}
                    CarMileage={"193 tys"}
                    FuelType={"diesel"}

                />

                    {/*{*/}
                    {/*    data.forEach((i) => {*/}
                    {/*        return (*/}
                    {/*            <CarCard*/}
                    {/*                ImageCar={i.image}*/}
                    {/*                CarBrand={i.name}*/}
                    {/*                CarPrice={i.price}*/}
                    {/*                ProductionDate={"2012"}*/}
                    {/*                CarMileage={"193 tys"}*/}
                    {/*                FuelType={"diesel"}*/}

                    {/*            />*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}




            </div>
        </div>


    );
}

export default Main;
