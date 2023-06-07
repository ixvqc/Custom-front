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
import AddAnnouncement from "./AddAnnouncement";
import {toast, ToastContainer} from "react-toastify";
import {collection, onSnapshot, query, getDocs, addDoc} from "@firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import NavbarMain from "../components/NavBarMain";
import NavbarLogin from "../components/NavBarLogin";
import { doc} from "@firebase/firestore";
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
        Wypos: "",
        Zdje: ""
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

    localStorage.setItem("CurrentTime", Date())

    const notify = () => {
        if (localStorage.getItem("CurrentTime")+5<Date()){
            toast("Masz wiadomość!") ;
        }
        localStorage.setItem("CurrentTime", Date())
    }

    useEffect(() => {
        const fetchData = async () => {
            //const querySnapshot = await getDocs(userChatsTestRef);
            const q = query(collection(db, "userChats"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const chat = [];
                querySnapshot.forEach((doc) => {
                    chat.push(doc.data().Kto);
                });
                console.log("Current users: ", chat.join(", "));
                notify()
            });
            // Cleanup the snapshot listener when the component unmounts
            return () => unsubscribe();
        };

        fetchData();
    }, []);




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

    const [testForOffer, setTestForOffer] = useState(true);

    useEffect(() => {
        if (carListRef.current !== carList && carList.length > 0 && testForOffer) {
            setOfferCars(carList);
            console.log("Działa");
            console.log("carList: ", carList);
            console.log("offerCars: ", offerCars);
            carListRef.current = carList;
            setTestForOffer(false); // Update the state of testForOffer to false
            console.log(testForOffer);
        }
    }, [carList, testForOffer]);



    return (

        <div className="main">

            {currentUser && <NavbarLogin/>}
            {!currentUser && <NavbarMain/>}
            <div>
                <ToastContainer />
            </div>
            <form>
                <div className="image-background">
                    <div className="filters">
                        <div className="filters-line">
                            <img src={imageSrc === auto ? autoHighlights : auto} onClick={() => {
                                handleClick(auto);
                                hideCarsClick();
                            }} className="choices-logo"/>
                            <p className="text-choices">Osobowe</p>

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
                                    <p>Szczegółowe wyszukiwanie</p>
                                </Link>

                                <button className="search" type = "button" onClick={ZmianaPrzycisku1} style ={{display: visibility ? 'none' : 'block'}}>
                                    Szukaj
                                </button>

                                <button className="search" type = "button" onClick={ZmianaPrzycisku1} style ={{display: visibility ? 'block' : 'none'}}>
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
                {offerCars.length > 1 && (
                    <CarCard
                        ImageCar={offerCars[1].Zdje}
                        CarBrand={offerCars[1].Marka}
                        CarPrice={offerCars[1].Cena + " zł"}
                        ProductionDate={offerCars[1].Rok}
                        CarMileage={offerCars[1].Przebieg}
                        FuelType={offerCars[1].Paliwo}
                    />
                )}
                {offerCars.length > 2 && (
                    <CarCard
                        ImageCar={offerCars[2].Zdje}
                        CarBrand={offerCars[2].Marka}
                        CarPrice={offerCars[2].Cena + " zł"}
                        ProductionDate={offerCars[2].Rok}
                        CarMileage={offerCars[2].Przebieg}
                        FuelType={offerCars[2].Paliwo}
                    />
                )}
                {offerCars.length > 3 && (
                    <CarCard
                        ImageCar={offerCars[3].Zdje}
                        CarBrand={offerCars[3].Marka}
                        CarPrice={offerCars[3].Cena + " zł"}
                        ProductionDate={offerCars[3].Rok}
                        CarMileage={offerCars[3].Przebieg}
                        FuelType={offerCars[3].Paliwo}
                    />
                )}
                {offerCars.length > 4 && (
                    <CarCard
                        ImageCar={offerCars[4].Zdje}
                        CarBrand={offerCars[4].Marka}
                        CarPrice={offerCars[4].Cena + " zł"}
                        ProductionDate={offerCars[4].Rok}
                        CarMileage={offerCars[4].Przebieg}
                        FuelType={offerCars[4].Paliwo}
                    />
                )}
                {offerCars.length > 5 && (
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