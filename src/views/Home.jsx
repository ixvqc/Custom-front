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
    const [marka, setMarka] = React.useState(null);
    const [cena, setCena] = React.useState(null);
    const [rok, setRok] = React.useState(null);
    const [przebieg, setPrzebieg] = React.useState(null);
    const [paliwo, setPaliwo] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [carList,setCarList] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const carCollectionRef = collection(db, "Search-test");
    const [carID, setCarID] = useState('');
    const [reviewText, setReviewText] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [visibility2, setVisibility2] = useState(false);

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


    const addField = async (event, carID) => {
        event.preventDefault();
        setCarID(carID)
        try {
            const docRef = await addDoc(collection(db, 'Review'), {
                carID: carID,
                review: reviewText,
            });
            console.log('Document written with ID: ', docRef.id);
            setCarID('');
            setReviewText('');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };



    function popUpOffer(event) {
        axios({
            method: "GET",
            url: "/offerData",
            data: {
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
                setMarka(sessionStorage.getItem("brand"))
                sessionStorage.setItem("year", response.data.year)
                setRok(sessionStorage.getItem("year"))
                sessionStorage.setItem("mileage", response.data.mileage)
                setPrzebieg(sessionStorage.getItem("mileage") / 1000 + " tys")
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




    useEffect(() => {
        const getCarList = async () => {
            const data = await getDocs(carCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log("FilteredData: ", filteredData)
            console.log("?.Rok: ", filteredData.rok)
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
            console.log(doubleFilter);
            setCarList(doubleFilter);
        };

        getCarList();
    },[registerForm]);



    console.log(carList)





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

                        {/*<CSSTransition*/}
                        {/*    in={motorOff}*/}
                        {/*    appear={true}*/}
                        {/*    timeout={500}*/}
                        {/*    classNames="fade-main"*/}
                        {/*    unmountOnExit*/}
                        {/*>*/}
                        {/*    <div>*/}
                        {/*        <div className="input">*/}
                        {/*            <label className="radioMain">*/}
                        {/*                <input type="radio" value="new" name="criteria-is.new"/> Nowe*/}
                        {/*            </label>*/}
                        {/*            <label className="radio">*/}
                        {/*                <input type="radio" value="used" name="criteria-is.new"/> Używane*/}
                        {/*            </label>*/}
                        {/*            <label className="radio">*/}
                        {/*                <input*/}
                        {/*                    type="radio"*/}
                        {/*                    value="all-cars"*/}
                        {/*                    name="criteria-is.new"*/}
                        {/*                    defaultChecked={true}*/}
                        {/*                />{" "}*/}
                        {/*                Wszystkie*/}
                        {/*            </label>*/}
                        {/*            <br/>*/}
                        {/*        </div>*/}

                        {/*        <input type="text" className="car-information" placeholder="Dowolna motor"/>*/}
                        {/*        <input type="text" className="car-information" placeholder="Dowolny model"/>*/}
                        {/*        <input type="text" className="car-year" placeholder="Rok od"/>*/}
                        {/*        <input type="text" className="car-year" placeholder="Rok do"/>*/}
                        {/*        <input type="text" className="car-price" placeholder="Cena od"/>*/}
                        {/*        <input type="text" className="car-price" placeholder="Cena do"/>*/}

                        {/*        <div className="input">*/}
                        {/*            <label className="radio">*/}
                        {/*                <input type="radio" value="fuel" name="fuel_type"/> Benzyna*/}
                        {/*            </label>*/}
                        {/*            <label className="radio">*/}
                        {/*                <input type="radio" value="diesel" name="fuel_type"/> Diesel*/}
                        {/*            </label>*/}
                        {/*            <label className="radio">*/}
                        {/*                <input*/}
                        {/*                    type="radio"*/}
                        {/*                    value="all_type"*/}
                        {/*                    name="fuel_type"*/}
                        {/*                    defaultChecked={true}*/}
                        {/*                />{" "}*/}
                        {/*                Wszystkie*/}
                        {/*            </label>*/}
                        {/*            <br/>*/}
                        {/*        </div>*/}

                        {/*        <Link to={"/login"} className="detailed-search">*/}
                        {/*            Szczegółowe wyszukiwanie*/}
                        {/*        </Link>*/}
                        {/*        <button className="search">*/}
                        {/*            <Link to={"/login"} className="link">*/}
                        {/*                Szukaj*/}
                        {/*            </Link>*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</CSSTransition>*/}

                        {/*<CSSTransition*/}
                        {/*    in={otherOff}*/}
                        {/*    appear={true}*/}
                        {/*    timeout={500}*/}
                        {/*    classNames="fade-main"*/}
                        {/*    unmountOnExit*/}
                        {/*>*/}
                        {/*    <div>*/}
                        {/*        <div className="input">*/}
                        {/*            <label className="radio">*/}
                        {/*                <input type="radio" value="new" name="criteria-is.new"/> Nowe*/}
                        {/*            </label>*/}
                        {/*            <label className="radio">*/}
                        {/*                <input type="radio" value="used" name="criteria-is.new"/> Używane*/}
                        {/*            </label>*/}
                        {/*            <label className="radio">*/}
                        {/*                <input*/}
                        {/*                    type="radio"*/}
                        {/*                    value="all-cars"*/}
                        {/*                    name="criteria-is.new"*/}
                        {/*                    defaultChecked={true}*/}
                        {/*                />{" "}*/}
                        {/*                Wszystkie*/}
                        {/*            </label>*/}
                        {/*            <br/>*/}
                        {/*        </div>*/}

                        {/*        <input type="text" className="car-information" placeholder="Dowolne inne cos"/>*/}
                        {/*        <input type="text" className="car-information" placeholder="Dowolny model"/>*/}
                        {/*        <input type="text" className="car-year" placeholder="Rok od"/>*/}
                        {/*        <input type="text" className="car-year" placeholder="Rok do"/>*/}
                        {/*        <input type="text" className="car-price" placeholder="Cena od"/>*/}
                        {/*        <input type="text" className="car-price" placeholder="Cena do"/>*/}

                        {/*        <div className="radio">*/}
                        {/*            <label className="radio">*/}
                        {/*                <input type="radio"*/}
                        {/*                       value="fuel"*/}
                        {/*                       name="fuel_type"/> Benzyna*/}


                        {/*                <input type="radio"*/}
                        {/*                       value="diesel"*/}
                        {/*                       name="fuel_type"/> Diesel*/}

                        {/*                <input*/}
                        {/*                    type="radio"*/}
                        {/*                    value="all_type"*/}
                        {/*                    name="paliwo"*/}
                        {/*                    defaultChecked={true}*/}
                        {/*                />{" "}*/}
                        {/*                Wszystkie*/}
                        {/*            </label>*/}
                        {/*            <br/>*/}
                        {/*        </div>*/}

                        {/*        <Link to={"/login"} className="detailed-search">*/}
                        {/*            Szczegółowe wyszukiwanie*/}
                        {/*        </Link>*/}
                        {/*        <button className="search">*/}
                        {/*            <Link to={"/login"} className="link">*/}
                        {/*                Szukaj*/}
                        {/*            </Link>*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</CSSTransition>*/}

                    </div>
                </div>
            </form>





            <div style={{display: !isActive ? 'none' : "inline-block"}} className="popular-offers-text-div"
                 id="place-to-add-offer">
                <CarCard id="offerCard"
                         ImageCar={image}
                         CarBrand={marka}
                         CarPrice={cena}
                         ProductionDate={rok}
                         CarMileage={przebieg}
                         FuelType={paliwo}
                />
            </div>
            <div className="popular-offers-text-div">
                <text className="popular-offers-text">Najpopularniejsze oferty</text>

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


            </div>
        </div>


    );
}
