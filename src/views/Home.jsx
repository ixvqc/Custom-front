import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState, useContext, useRef} from "react";
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
import {signOut} from "firebase/auth"
import {auth, db} from '../firebase'
import { AuthContext } from "../context/AuthContext";
import NavbarMain from "../components/NavBarMain";
import NavbarLogin from "../components/NavBarLogin";
import {addDoc, collection, doc, getDocs} from "@firebase/firestore";
import {getDoc, updateDoc} from "firebase/firestore";




export default function Home(props){
    const {currentUser} = useContext(AuthContext)
    const [carList,setCarList] = useState([]);
    const carCollectionRef = collection(db, "Search-test");
    const [offerCars, setOfferCars] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const [visibility2, setVisibility2] = useState(false);
    const carListRef = useRef(carList);
    const [registerForm, setregisterForm] = useState({

        Marka: "",
        Model: "",
        RokOd: "",
        RokDo: "",
        CenaOd: "",
        CenaDo: "",
        Paliwo: "",
        PrzebiegOd: "",
        PrzebiegDo: "",
        Kraj: "",
        Nadwozie: "",
        Lokalizacja: "",
        Stan: "",
        Silnik: "",
        Wypos: ""
    })

    function handleChange(event) {
        const {value, name} = event.target
        setregisterForm(prevNote => ({
                ...prevNote, [name]: value
            })
        )
    }

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
    const ZmianaPrzycisku1 = () => {
        setVisibility(!visibility);
        console.log(registerForm.Marka)
    }
    const ZmianaPrzycisku2 = () => {
        setVisibility2(!visibility2);
    }

    const hideOtherClick = () => {
        setCarsOff(false);
        setMotorOff(false);
        setOtherOff(true);
    };



    useEffect(() => {
        const getCarList = async () => {
            const data = await getDocs(carCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            const doubleFilter = filteredData.filter((car) => {
                const Marka = registerForm.Marka.toLowerCase();
                const Model = registerForm.Model.toLowerCase();
                const Paliwo = registerForm.Paliwo.toLowerCase();
                const Kraj = registerForm.Kraj.toLowerCase();
                const Lokalizacja = registerForm.Lokalizacja.toLowerCase();
                const Nadwozie = registerForm.Nadwozie.toLowerCase();
                const Stan = registerForm.Stan.toLowerCase();
                const Silnik = registerForm.Silnik.toLowerCase();
                const Wypos = registerForm.Wypos.toLowerCase();
                const RokOd = registerForm.RokOd
                const RokDo = registerForm.RokDo
                const CenaOd = registerForm.CenaOd
                const CenaDo = registerForm.CenaDo
                const PrzebiegOd = registerForm.PrzebiegOd
                const PrzebiegDo = registerForm.PrzebiegDo
                const values = Object.values(car).join("").toLowerCase()

                return(
                    (Marka === '' || values.includes(Marka)) &&
                    (Model === '' || values.includes(Model)) &&
                    (Kraj === '' || values.includes(Kraj)) &&
                    (Lokalizacja === '' || values.includes(Lokalizacja)) &&
                    (Nadwozie === '' || values.includes(Nadwozie)) &&
                    (Stan === '' || values.includes(Stan)) &&
                    (Silnik === '' || values.includes(Silnik)) &&
                    (Wypos === '' || values.includes(Wypos)) &&
                    (Paliwo === '' || values.includes(Paliwo)) &&
                    (RokOd === '' || car.Rok >= RokOd) &&
                    (RokDo === '' || car.Rok <= RokDo) &&
                    (CenaOd === '' || car.Cena >= CenaOd) &&
                    (CenaDo === '' || car.Cena <= CenaDo) &&
                    (PrzebiegOd === '' || car.Przebieg >= PrzebiegOd) &&
                    (PrzebiegDo === '' || car.Przebieg <= PrzebiegDo)
                    //console.log(filteredData);
                )
            });
            setCarList(doubleFilter);
        };

        getCarList();
    },[registerForm]);

    useEffect(() => {
        if (carListRef.current !== carList && carList.length > 0) {
            setOfferCars(carList);
            console.log("Działa");
            console.log("carList: ", carList)
            carListRef.current = carList;
        }
    }, [carList]);




    return (

        <div className="main">

            {currentUser && <NavbarLogin/>}
            {!currentUser && <NavbarMain/>}

            <form>
                <div className="image-background">
                    <div className="filters">
                        <div className="filters-line">
                            <img src={imageSrc === auto ? autoHighlights : auto} onClick={() => {
                                handleClick(auto);
                                hideCarsClick();
                            }} className="choices-logo"/>
                            <img src={imageSrc === moto ? motoHighlights : moto} onClick={() => {
                                handleClick(moto);
                                hideMotorClick();
                            }} className="choices-moto"/>
                            <img src={imageSrc === key ? keyHighlights : key} onClick={() => {
                                handleClick(key);
                                hideOtherClick();
                            }} className="choices-key"/><br/>
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

                                <input type="text" className={"car-info-search"}
                                       name="Marka" placeholder="Dowolna marka" onChange={handleChange}/>

                                <input type="text" className={"car-info-search"}
                                       name="Model" placeholder="Dowolny model" onChange={handleChange}/>

                                <input type="number" className={"car-info-search"}
                                       id = "car-year-1" name="RokOd" placeholder="Rok od" onChange={handleChange}/>

                                <input type="number" className={"car-info-search"}
                                       id = "car-year-2" name="RokDo" placeholder="Rok do" onChange={handleChange}/>

                                <input type="number" className={"car-price"}
                                       id = "car-price-1" name="CenaOd" placeholder="Cena od" onChange={handleChange}/>

                                <input type="number" className={"car-price"}
                                       id = "car-price-2" name="CenaDo" placeholder="Cena do" onChange={handleChange}/>

                                <div className="input">

                                    <label className="radioMain"  onChange={handleChange}>
                                        <input
                                            type="radio"
                                            value="BENZYNA"
                                            name="Paliwo"
                                        /> Benzyna

                                        <input
                                            type="radio"
                                            value="LPG"
                                            name="Paliwo"
                                        /> LPG

                                        <input
                                            type="radio"
                                            value=""
                                            name="Paliwo"
                                            defaultChecked={true}
                                        />{" "}

                                        Wszystkie
                                    </label>



                                    <br/>
                                </div>




                                <Link to={"/Search"} className="detailed-search">
                                    Szczegółowe wyszukiwanie
                                </Link>
                                <button className="button-search" type = "button" onClick={ZmianaPrzycisku1} style ={{display: visibility ? 'none' : 'block'}}>
                                    Szukaj
                                </button>

                                <button className="button-search" type = "button" onClick={ZmianaPrzycisku1} style ={{display: visibility ? 'block' : 'none'}}>
                                    Ukryj
                                </button>



                            </div>
                        </CSSTransition>

                    </div>
                </div>
            </form>





            <div style={{display: !visibility ? "none" : "inline-block"}} className="popular-offers-text-div"
                 id="place-to-add-offer">
                {carList.length > 0 && (
                    <CarCard
                        ImageCar={carList[0].Zdje}
                        CarBrand={carList[0].Marka}
                        CarPrice={carList[0].Cena}
                        ProductionDate={carList[0].Rok}
                        CarMileage={carList[0].Przebieg}
                        FuelType={carList[0].Paliwo}
                    />
                )}
            </div>
            <div className="popular-offers-text-div">
                <text className="popular-offers-text">Najpopularniejsze oferty</text>

            </div>


            <div className="popular-offers-homepage">
                {offerCars.length > 0 && (
                    <CarCard
                        ImageCar={offerCars[0].Zdje}
                        CarBrand={offerCars[0].Marka}
                        CarPrice={offerCars[0].Cena + " zł"}
                        ProductionDate={offerCars[0].Rok}
                        CarMileage={offerCars[0].Przebieg}
                        FuelType={offerCars[0].Paliwo}
                    />
                )}
                {offerCars.length > 0 && (
                    <CarCard
                        ImageCar={offerCars[1].Zdje}
                        CarBrand={offerCars[1].Marka}
                        CarPrice={offerCars[1].Cena + " zł"}
                        ProductionDate={offerCars[1].Rok}
                        CarMileage={offerCars[1].Przebieg}
                        FuelType={offerCars[1].Paliwo}
                    />
                )}
                {offerCars.length > 0 && (
                    <CarCard
                        ImageCar={offerCars[2].Zdje}
                        CarBrand={offerCars[2].Marka}
                        CarPrice={offerCars[2].Cena + " zł"}
                        ProductionDate={offerCars[2].Rok}
                        CarMileage={offerCars[2].Przebieg}
                        FuelType={offerCars[2].Paliwo}
                    />
                )}
                {offerCars.length > 0 && (
                    <CarCard
                        ImageCar={offerCars[3].Zdje}
                        CarBrand={offerCars[3].Marka}
                        CarPrice={offerCars[3].Cena + " zł"}
                        ProductionDate={offerCars[3].Rok}
                        CarMileage={offerCars[3].Przebieg}
                        FuelType={offerCars[3].Paliwo}
                    />
                )}
                {offerCars.length > 0 && (
                    <CarCard
                        ImageCar={offerCars[4].Zdje}
                        CarBrand={offerCars[4].Marka}
                        CarPrice={offerCars[4].Cena + " zł"}
                        ProductionDate={offerCars[4].Rok}
                        CarMileage={offerCars[4].Przebieg}
                        FuelType={offerCars[4].Paliwo}
                    />
                )}
                {offerCars.length > 0 && (
                    <CarCard
                        ImageCar={offerCars[5].Zdje}
                        CarBrand={offerCars[5].Marka}
                        CarPrice={offerCars[5].Cena + " zł"}
                        ProductionDate={offerCars[5].Rok}
                        CarMileage={offerCars[5].Przebieg}
                        FuelType={offerCars[5].Paliwo}
                    />
                )}


            </div>
        </div>


    );
}