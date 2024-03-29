import React, {useContext,useState, useEffect, useRef, } from 'react';
import {useNavigate,Link} from "react-router-dom";
import '../styles/OfferHistory.css';
import logo from '../assets/img/logov2.png';
import { AuthContext } from '../context/AuthContext'
import 'firebase/auth';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {db, firestore} from '../firebase'
import 'firebase/firestore';
import {collection, getDocs} from "@firebase/firestore";


function OfferHistory(props) {

    const {currentUser} = useContext(AuthContext)
    const db = getFirestore();



    const [carList,setCarList] = useState([]);
    const carCollectionRef = collection(db, "Search-test");
    const [visibility, setVisibility] = useState(false)
    const myUidIsHere = "swx3NTpFhtZA21NWyAPLsRRkxUC3"


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
        uid: "",
        Opis: ""
    })

    function handleChange(event) {
        const {value, name} = event.target
        setregisterForm(prevNote => ({
                ...prevNote, [name]: value
            })
        )
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
                const uid = registerForm.uid.toLowerCase();
                const Opis = registerForm.uid.toLowerCase();
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
                    (uid === '' || values.includes(uid)) &&
                    (Opis === '' || values.includes(Opis)) &&
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











    const handleClickgetIdDoc = (carId) => {
        const idDocAfterClick=carId;
    };

    const ChangeMarkaRef = useRef();
    const ChangeModelRef = useRef();
    const ChangeCenaRef = useRef();
    const ChangeOpisRef = useRef();
    const ChangeRokRef = useRef();


    const docRef = doc(db, "Search-test", "HGNWbVjpvcrgIL8dnLLr");

    const handleSendChangeAdd = async (event) => {
        const data = {
            Marka: ChangeMarkaRef.current.value,
            Model: ChangeModelRef.current.value,
            Cena: ChangeCenaRef.current.value,
            Opis: ChangeOpisRef.current.value,
            Rok: ChangeRokRef.current.value
        };
        updateDoc(docRef, data)
            .then(docRef => {
                console.log("Value of an Existing Document Field has been updated");
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <div className="mainOfferHistory">

            <div className="cointainerNavOfferHistory">
                <div className="logo-div-OfferHistory">
                    <a href="/">
                        <img src={logo} alt="Main.js Logo" className="logo-main-OfferHistory"/>
                    </a>
                </div>
                <div className="buttongroupus-OfferHistory">
                    <div className="obserwowaneus-div-OfferHistory">
                        <button className="obserwowane-OfferHistory">
                            <Link className="favlink" to="/favourites">
                                Obserwowane ★
                            </Link>
                        </button>
                    </div>

                    <div className="Usernamedisp-div-OfferHistory">
                        <button className="Usernamedisp-OfferHistory">

                            <span>{currentUser.displayName}</span>

                        </button>
                    </div>
                    <div className="ogloszenie-button-div-OfferHistory">

                        <button className="ogloszenie-button-OfferHistory">
                            <a href="/AddAnnouncement" className="ogloszenie-text-OfferHistory">
                                Dodaj Ogłoszenie
                            </a>
                        </button>

                    </div>
                </div>
            </div>
            <div className="cointainerMidNavOfferHistory">
                <div>
                    <Link to="/user">
                        <button className="button1user-OfferHistory">
                            Konto
                        </button>
                    </Link>
                    <Link to="/changeadd">
                        <button className="button2user-OfferHistory">
                            Ogłoszenia
                        </button>
                    </Link>
                    <Link to="/messages">
                        <button className="button3user-OfferHistory">
                            Wiadomości
                        </button>
                    </Link>
                    <Link to="/offerHistory">
                        <button className="button4user-OfferHistory">
                            Historia
                        </button>
                    </Link>
                </div>
            </div>
            <div className="cointainerTitleOfferHistory">

                <div>Historia Ogłoszeń</div>
            </div>
            <div className="cointainerMainOfferHistory">

                    {carList.map((car) => (


                            <div className={"offer-data-search-OfferHistory"}>
                                <div className={"offer-image-OfferHistory"}>
                                    <img className= {"car-image-OfferHistory"} src={car.Zdje}/>
                                </div>
                                <div className={"offer-text-search-OfferHistory"}>
                                    <p><strong>Marka: </strong>{car.Marka}</p>
                                    <p><strong>Model: </strong>{car.Model}</p>
                                </div>
                                <div className={"offer-text-search-OfferHistory"}>
                                    <p><strong>Kraj pochodzenia:</strong> {car.Kraj}</p>
                                    <p><strong>Przebieg:</strong> {car.Przebieg}Km</p>
                                </div>


                                <div className={"offer-text-search-OfferHistory"}>
                                    <p><strong>Typ nadwozia:</strong> {car.Nadwozie}</p>
                                    <p><strong>Paliwo:</strong> {car.Paliwo}</p>
                                </div>
                                <div className={"offer-text-search-OfferHistory"}>
                                    <p><strong>Rok produkcji:</strong> {car.Rok}</p>
                                    <p className="price-search-ChangeAdd">Cena:{car.Cena}zł</p>
                                </div>
                                <div className={"offer-text-search-OfferHistory"}>
                                    <p><strong>Opis:</strong> {car.Opis}</p>
                                </div>

                                <button className="btnHeartOfferHistory"  onClick={() => handleClickgetIdDoc(car.id)}>
                                    <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503"
                                         className="iconHeartOfferHistory">
                                        <path transform="translate(0 0)"
                                              d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
                                              id="Fill"></path>
                                    </svg>
                                </button>

                            </div>

                    ))}


            </div>


        </div>


    );


}
export default OfferHistory;