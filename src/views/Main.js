import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Main.css';
import auto from "../assets/img/car.png";
import key from "../assets/img/car-key.png";
import moto from "../assets/img/motorbike.png";
import autoHighlights from "../assets/img/carHighlights.png";
import keyHighlights from "../assets/img/car-keyHighlights.png";
import motoHighlights from "../assets/img/motorbikeHighlights.png";
import car1 from "../assets/img/car1.jpg";
import car2 from "../assets/img/car2.jpg";
import car3 from "../assets/img/car3.jpg";
import logo from "../assets/img/logov2.png";
import axios from "axios";
import CarCard  from "../components/CarCard";
import SearchFormCars from "../components/SearchFormCars";
import SearchFormMotorcycles from "../components/SearchFormMotorcycles";
import SearchFormOther from "../components/SearchFormOther";

function Main(props) {


    const [carsOff, setcarsOff] = useState(false);
    const [motorOff, setmotorsOff] = useState(true);
    const [otherOff, setothersOff] = useState(true);

    const [carsHighlights, setcarsHighlights] = useState(auto);

    function toggleCarHighligh() {
        carsHighlights(autoHighlights);
    }

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

                {/*<button onClick={logMeOut}>*/}
                {/*    Logout*/}
                {/*</button>*/}

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
                        <img src={auto} onClick={() => setcarsOff(s => !s)} className="choices-logo"/>
                        <img src={moto} onClick={() => setmotorsOff(s => !s)} className="choices-moto"/>
                        <img src={key} onClick={() => setothersOff(s => !s)} className="choices-key"/><br/>
                        <text className="text-choices"> Osobowe</text>
                        <text className="text-choices">Motocykle </text>
                        <text className="text-choices">Inne </text>
                    </div>

                        {!carsOff ? <SearchFormCars /> : null}
                        {!motorOff ? <SearchFormMotorcycles /> : null}
                        {!otherOff ? <SearchFormOther /> : null}

                </div>
            </div>
            <div className="popular-offers-text-div">
                <text className="popular-offers-text">Najpopularniejsze oferty </text>

            </div>



            <div className="popular-offers-homepage">
                  <CarCard
                    ImageCar={car1}
                    CarBrand={"Volvo"}
                    CarPrice={"99 876 zł"}
                    ProductionDate={"2023"}
                    CarMileage={"193 tys"}
                    FuelType={"diesel"}

                  />
                <CarCard
                    ImageCar={car2}
                    CarBrand={"Mitshubishi"}
                    CarPrice={"51 999 zł"}
                    ProductionDate={"2011"}
                    CarMileage={"193 tys"}
                    FuelType={"benzyna"}

                />
                <CarCard
                    ImageCar={car3}
                    CarBrand={"Hyundai"}
                    CarPrice={"132 382 zł"}
                    ProductionDate={"2021"}
                    CarMileage={"23 tys"}
                    FuelType={"diesel"}

                />
                <CarCard
                    ImageCar={car3}
                    CarBrand={"Opel"}
                    CarPrice={"132 382 zł"}
                    ProductionDate={"2012"}
                    CarMileage={"193 tys"}
                    FuelType={"diesel"}

                />
                <CarCard
                    ImageCar={car1}
                    CarBrand={"Mazda"}
                    CarPrice={"132 382 zł"}
                    ProductionDate={"2012"}
                    CarMileage={"193 tys"}
                    FuelType={"diesel"}

                />
                <CarCard
                    ImageCar={car2}
                    CarBrand={"Fiat"}
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
