import {useNavigate,Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Search.css';
import logo from '../assets/img/logov2.png';
import React, { useRef } from "react";
import { db } from "../firebase"
import {getDocs, collection, doc, query, where, limit} from "@firebase/firestore";
import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "../firebase";
import Compare from "../components/Compare";
import {stringify} from "uuid";


function Search()  {
    const [carList,setCarList] = useState([]);
    const carCollectionRef = collection(db, "Search-test");
    const [visibility, setVisibility] = useState(false)
    const navigate = useNavigate();



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

    const goToCompare = () =>{
        navigate("/Compare")
    }
    const HandleClick = () => {
        setVisibility(!visibility);
        console.log(registerForm.Marka)
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


    function addCompare(obj) {
        const data = localStorage.getItem("compare");

        if (data === null) {
            console.log("pusta");
            let tempArray = [];
            tempArray.push(obj);
            console.log(tempArray);
            localStorage.setItem("compare", JSON.stringify(tempArray));
        } else {
            console.log("jest");

            let tempArray = JSON.parse(data); // Przekształć dane z localStorage na tablicę
            tempArray.push(obj); // Dodaj obj do tablicy
            console.log(tempArray);
            localStorage.setItem("compare", JSON.stringify(tempArray)); // Zapisz zaktualizowaną tablicę w localStorage
        }
    }


    return (
        <div className="back-background-search">

            <div className="nav-search">


                <div className="logo-div-search">
                    <a href="http://localhost:3000">
                        <img src={logo} className="logo-search"/>
                    </a>

                </div>

                <Link to={"/user"} className="link-search">
                    Moje konto
                </Link>
                <Link to={"/messages"} className="link-search">
                    wiadomości
                </Link>

                <button className="logout-button" onClick={() => signOut(auth)}>logout</button>

                <button className="add-adv-search">
                    <Link to={"/login"} className="link-search">Dodaj ogłoszenie + </Link>
                </button>

            </div>


            <div className="background-search">

                <form>
                    <div className="foreground-search">
                        <div className="text-search">
                        </div>
                        <div className={"inputs-search"}>
                            <input type="text" className={"car-info-search"} name="Marka" placeholder="Dowolna marka" onChange={handleChange}/>
                            <input type="text" className={"car-info-search"} name="Model" placeholder="Dowolny model" onChange={handleChange}/>

                            <div className={"input-float"}>
                                <input type="number" className={"car-info-search"} id = "car-year-1" name="RokOd" placeholder="Rok od" onChange={handleChange}/>
                                <input type="number" className={"car-info-search"} id = "car-year-2" name="RokDo" placeholder="Rok do" onChange={handleChange}/>
                            </div>

                            <div className={"input-float"}>
                                <input type="number" className={"car-info-search"} id = "car-price-1" name="CenaOd" placeholder="Cena od" onChange={handleChange}/>
                                <input type="number" className={"car-info-search"} id = "car-price-2" name="CenaDo" placeholder="Cena do" onChange={handleChange}/>
                            </div>

                            <input type="text" className={"car-info-search"} name="Kraj" placeholder="Kraj pochodzenia" onChange={handleChange}/>

                            <select className={"car-info-search"} name="Nadwozie" onChange={handleChange}>
                                <option value="">Dowolne nadwozie</option>
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
                                <input type="number" className={"car-info-search"} id = "car-mileage-1" name="PrzebiegOd" placeholder="Przebieg od" onChange={handleChange}/>
                                <input type="number" className={"car-info-search"} id = "car-mileage-2" name="PrzebiegDo" placeholder="Przebieg do" onChange={handleChange}/>
                            </div>

                            <input type="text" className={"car-info-search"} name="Lokalizacja" placeholder="Dowolna lokalizacja" onChange={handleChange}/>
                            <input type="text" className={"car-info-search"} name="Stan" placeholder="Dowolny stan" onChange={handleChange}/>
                            <input type="text" className={"car-info-search"} name="Silnik" placeholder="Dowolny silnik" onChange={handleChange}/>
                            <input type="text" className={"car-info-search"} name="Wypos" placeholder="Dowolne wyposażenie" onChange={handleChange}/>

                            <select className={"car-info-search"} name="Paliwo" onChange={handleChange}>
                                <option value="">Dowolne paliwo</option>
                                <option value="Benzyna">Benzyna</option>
                                <option value="LPG">LPG</option>
                                <option value="Elektryczne">Elektryczne</option>
                                <option value="Hybryda">Hybryda</option>
                                <option value="Inne">Inne</option>
                            </select>


                            <button className="button-search" type = "button" onClick={HandleClick} style ={{display: visibility ? 'none' : 'block'}}>
                                Szukaj
                            </button>

                            <button className="button-search" type = "button" onClick={HandleClick} style ={{display: visibility ? 'block' : 'none'}}>
                                Ukryj
                            </button>
                            <button className="compare-button"
                                    onClick={goToCompare}
                            >
                                Porównaj
                            </button>


                        </div>
                    </div>

                </form>
            </div>
            <div style ={{display: visibility ? 'block' : 'none'}}>
                {carList.map((car) => (
                    <div className={"offer-search"}>
                        <div className={"offer-image-search"}>
                            <img className= {"car-image"} src={car.Zdje}/>
                        </div>

                        <div className={"offer-data-search"}>

                            <div>
                                <div className="compare">

                                <p className="car-name-search">{car.Marka}</p>

                                    <div className='compare-component'>
                                        <button
                                            onClick={()=> addCompare(car)}
                                        >
                                            Porównaj
                                        </button>

                                    </div>


                                </div>
                                <p><strong>Model: </strong>{car.Model}</p>
                            </div>

                            <div className={"offer-text-search"}>
                                <p><strong>Kraj pochodzenia:</strong> {car.Kraj}</p>
                                <p><strong>Lokalizacja:</strong> {car.Lokalizacja}</p>
                            </div>


                            <div className={"offer-text-search"}>
                                <p><strong>Typ nadwozia:</strong> {car.Nadwozie}</p>
                                <p><strong>Paliwo:</strong> {car.Paliwo}</p>
                            </div>
                            <div className={"offer-text-search"}>
                                <p><strong>Rok produkcji:</strong> {car.Rok}</p>
                                <p className="price-search">Cena:{car.Cena}</p>
                            </div>
                            <div className={"offer-text-search"}>
                                <p><strong>Przebieg:</strong> {car.Przebieg}</p>
                                <p><strong>Stan pojazdu:</strong> {car.Stan}</p>
                            </div>
                            <div className={"offer-text-search"}>
                                <p><strong>Silnik:</strong> {car.Silnik}</p>
                                <p><strong>Wyposażenie dodatkowe:</strong> {car.Wypos}</p>
                            </div>


                        </div>

                    </div>

                ))}

            </div>

        </div>


    );
}

export default Search;