import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
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
import { CSSTransition } from 'react-transition-group';


export default function Main(props) {





    const [registerForm, setregisterForm] = useState({
        marka: "",
        model: "",
        rokOd: "",
        rokDo: "",
        cenaOd: "",
        cenaDo: "",
        fuel_type: ""
    })


    function handleChange(event) {
        const {value, name} = event.target
        setregisterForm(prevNote => ({
            ...prevNote, [name]: value})
        )}

    const [imageSrc, setImageSrc] = useState(auto);
    function handleClick(src) {
        setImageSrc(src);
    }

    const [carsOff, setCarsOff] = useState(false);
    const [motorOff, setMotorOff] = useState(true);
    const [otherOff, setOtherOff] = useState(true);

    useEffect(() => {
        hideCarsClick();
    }, []);

    const hideCarsClick = () => {
        setCarsOff(true);
        setMotorOff(false);
        setOtherOff(false);
    };

    const hideMotorClick = () => {
        setCarsOff(false);
        setMotorOff(true);
        setOtherOff(false);
    };

    const hideOtherClick = () => {
        setCarsOff(false);
        setMotorOff(false);
        setOtherOff(true);
    };



  //  const [carsHighlights, setcarsHighlights] = useState(auto);

    // function toggleCarHighligh() {
    //     carsHighlights(autoHighlights);
    // }

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


    const [marka, setMarka] = React.useState(null);
    const [cena, setCena] = React.useState(null);
    const [rok, setRok] = React.useState(null);
    const [przebieg, setPrzebieg] = React.useState(null);
    const [paliwo, setPaliwo] = React.useState(null);
    const [image, setImage] = React.useState(null);

    const [isActive, setIsActive] = useState(false);
    function popUpOffer(event) {
        axios({
            method: "GET",
            url:"/offerData",
            data:{
                marka: registerForm.marka,
                model: registerForm.model,
                rokOd: registerForm.rokOd,
                rokDo: registerForm.rokDo,
                cenaOd: registerForm.cenaOd,
                cenaDo: registerForm.cenaDo,
                fuel_type: registerForm.fuel_type
            }
        })
            .then((response) => {
                sessionStorage.setItem("brand", response.data.brand)
                setMarka(sessionStorage.getItem("brand") )
                sessionStorage.setItem("year", response.data.year)
                setRok(sessionStorage.getItem("year"))
                sessionStorage.setItem("mileage", response.data.mileage)
                setPrzebieg(sessionStorage.getItem("mileage")/1000 + " tys")
                sessionStorage.setItem("fuel_type", response.data.fuel_type)
                setPaliwo(sessionStorage.getItem("fuel_type"))
                sessionStorage.setItem("price", response.data.price)
                setCena(sessionStorage.getItem("price") + " zł")
                let imageURL;
                imageURL = URL.createObjectURL(response.data.fimag)
                sessionStorage.setItem("image", imageURL)
                setImage(sessionStorage.getItem("image"))
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
            })
        event.preventDefault()

        sessionStorage.setItem("offerImage", 'https://www.wyborkierowcow.pl/wp-content/uploads/2022/09/bmw-serii-3-e36-cennik-1.jpg');
        var offerImage = sessionStorage.getItem("offerImage")
        setImage(offerImage)
        setIsActive(true)
    }




    const offerData = async (event) => {
        // try {
        //     const res = await axios.get("/offerData")
        //     console.log(res);
        // }
        // catch (error){
        //     console.log(error)
        // }
        //document.getElementById("place-to-add-offer").style.display = "inline-block"
    };

    useEffect(() => {
        offerData();
    },[]);
    // function popUpOffer() {
    //     //document.getElementById("place-to-add-offer").style.display = "inline-block"
    // }


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
                <Link to={"/messages"} className="link">
                    wiadomości
                </Link>
                <button className="add-adv"
                    // onMouseEnter={handleHover}
                    // onMouseLeave={handleHover}
                    // style={{ backgroundColor: buttonColor }}
                >
                    <Link to={"/login"} className="link">Dodaj ogłoszenie + </Link>
                </button>

            </div>

            <form>
            <div className="image-background">
                <div className="filters">
                    <div className="filters-line">
                        <img src={imageSrc === auto ? autoHighlights : auto} onClick={() => { handleClick(auto); hideCarsClick(); }} className="choices-logo"/>
                        <img src={imageSrc === moto ? motoHighlights : moto} onClick={() => { handleClick(moto); hideMotorClick();}} className="choices-moto"/>
                        <img src={imageSrc === key ? keyHighlights : key} onClick={() => { handleClick(key); hideOtherClick(); }} className="choices-key"/><br />
                        <text className="text-choices">Osobowe</text>
                        <text className="text-choices">Motocykle</text>
                        <text className="text-choices">Inne</text>
                    </div>


                    <CSSTransition
                        in={carsOff}
                        appear={true}
                        timeout={500}
                        classNames="fade-main"
                        unmountOnExit
                    >
                        <div>
                            <div className="input">
                                <label className="radio">
                                    <input onChange={handleChange} type="radio" value="new" name="criteria-is.new" /> Nowe
                                </label>
                                <label className="radio">
                                    <input onChange={handleChange} type="radio" value="used" name="criteria-is.new" /> Używane
                                </label>
                                <label className="radio">
                                    <input
                                        onChange={handleChange}
                                        type="radio"
                                        value="all-cars"
                                        name="criteria-is.new"
                                        defaultChecked={true}
                                    />{" "}
                                    Wszystkie
                                </label>
                                <br />
                            </div>

                            <input onChange={handleChange} type="text" className="car-information" placeholder="Dowolne auto" name = "marka"/>
                            <input onChange={handleChange} type="text" className="car-information" placeholder="Dowolny model" name = "model"/>
                            <input onChange={handleChange} type="text" className="car-year" placeholder="Rok od" />
                            <input onChange={handleChange} type="text" className="car-year" placeholder="Rok do" />
                            <input onChange={handleChange} type="text" className="car-price" placeholder="Cena od" />
                            <input onChange={handleChange} type="text" className="car-price" placeholder="Cena do" />

                            <div className="input">
                                <label className="radio">
                                    <input onChange={handleChange} type="radio" value="fuel" name="fuel_type" /> Benzyna
                                </label>
                                <label className="radio">
                                    <input onChange={handleChange} type="radio" value="diesel" name="fuel_type" /> Diesel
                                </label>
                                <label className="radio">
                                    <input
                                        onChange={handleChange}
                                        type="radio"
                                        value="%"
                                        name="fuel_type"
                                        defaultChecked={true}
                                    />{" "}
                                    Wszystkie
                                </label>
                                <br />
                            </div>

                            <Link to={"/login"} className="detailed-search">
                                Szczegółowe wyszukiwanie
                            </Link>
                            <button className="search" onClick={popUpOffer}>
                                    Szukaj
                            </button>
                        </div>
                    </CSSTransition>

                    <CSSTransition
                        in={motorOff}
                        appear={true}
                        timeout={500}
                        classNames="fade-main"
                        unmountOnExit
                    >
                        <div>
                            <div className="input">
                                <label className="radio">
                                    <input type="radio" value="new" name="criteria-is.new" /> Nowe
                                </label>
                                <label className="radio">
                                    <input type="radio" value="used" name="criteria-is.new" /> Używane
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
                                <br />
                            </div>

                            <input type="text" className="car-information" placeholder="Dowolna motor" />
                            <input type="text" className="car-information" placeholder="Dowolny model" />
                            <input type="text" className="car-year" placeholder="Rok od" />
                            <input type="text" className="car-year" placeholder="Rok do" />
                            <input type="text" className="car-price" placeholder="Cena od" />
                            <input type="text" className="car-price" placeholder="Cena do" />

                            <div className="input">
                                <label className="radio">
                                    <input type="radio" value="fuel" name="fuel_type" /> Benzyna
                                </label>
                                <label className="radio">
                                    <input type="radio" value="diesel" name="fuel_type" /> Diesel
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
                                <br />
                            </div>

                            <Link to={"/login"} className="detailed-search">
                                Szczegółowe wyszukiwanie
                            </Link>
                            <button className="search">
                                <Link to={"/login"} className="link">
                                    Szukaj
                                </Link>
                            </button>
                        </div>
                    </CSSTransition>

                    <CSSTransition
                        in={otherOff}
                        appear={true}
                        timeout={500}
                        classNames="fade-main"
                        unmountOnExit
                    >
                        <div>
                            <div className="input">
                                <label className="radio">
                                    <input type="radio" value="new" name="criteria-is.new" /> Nowe
                                </label>
                                <label className="radio">
                                    <input type="radio" value="used" name="criteria-is.new" /> Używane
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
                                <br />
                            </div>

                            <input type="text" className="car-information" placeholder="Dowolne inne cos" />
                            <input type="text" className="car-information" placeholder="Dowolny model" />
                            <input type="text" className="car-year" placeholder="Rok od" />
                            <input type="text" className="car-year" placeholder="Rok do" />
                            <input type="text" className="car-price" placeholder="Cena od" />
                            <input type="text" className="car-price" placeholder="Cena do" />

                            <div className="input">
                                <label className="radio">
                                    <input type="radio" value="fuel" name="fuel_type" /> Benzyna
                                </label>
                                <label className="radio">
                                    <input type="radio" value="diesel" name="fuel_type" /> Diesel
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
                                <br />
                            </div>

                            <Link to={"/login"} className="detailed-search">
                                Szczegółowe wyszukiwanie
                            </Link>
                            <button className="search">
                                <Link to={"/login"} className="link">
                                    Szukaj
                                </Link>
                            </button>
                        </div>
                    </CSSTransition>

                </div>
            </div>
            </form>
            <div style={{display : !isActive ? 'none' : "inline-block"}} className="popular-offers-text-div" id="place-to-add-offer">
                <CarCard id = "offerCard"
                    ImageCar={image}
                    CarBrand={marka}
                    CarPrice={cena}
                    ProductionDate={rok}
                    CarMileage={przebieg}
                    FuelType={paliwo}
                    />
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