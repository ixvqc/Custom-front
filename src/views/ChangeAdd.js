import React, {useContext,useState, useEffect, useRef, } from 'react';
import {useNavigate,Link} from "react-router-dom";
import '../styles/ChangeAdd.css';
import logo from '../assets/img/logov2.png';
import { AuthContext } from '../context/AuthContext'
import 'firebase/auth';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {db, firestore} from '../firebase'
import 'firebase/firestore';
import {collection, getDocs} from "@firebase/firestore";


function ChangeAdd(props) {

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
        uid: myUidIsHere,
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
        <div className="mainChangeAdd">

            <div className="containerNavChangeAdd">

                <div className="logo-div-ChangeAdd">
                    <a href="/">
                        <img src={logo} alt="Main.js Logo" className="logo-main-ChangeAdd"/>
                    </a>
                </div>
                <div className="buttongroupus-ChangeAdd">
                    <div className="obserwowaneus-div-ChangeAdd">
                        <button className="obserwowane-ChangeAdd">
                            Obserwowane ★
                        </button>
                    </div>

                    <div className="Usernamedisp-div-ChangeAdd">
                        <button className="Usernamedisp-ChangeAdd">

                            <span>{currentUser.displayName}</span>

                        </button>
                    </div>
                    <div className="ogloszenie-button-div-ChangeAdd">

                        <button className="ogloszenie-button-ChangeAdd">
                            <a href="/AddAnnouncement" className="ogloszenie-text-ChangeAdd">
                                Dodaj Ogłoszenie
                            </a>
                        </button>

                    </div>


                </div>


            </div>
            <div className="image-backgroundChangeAdd">
                <div>
                    <button className="button1user-ChangeAdd">
                        Konto
                    </button>

                    <button className="button2user-ChangeAdd">
                        Ogłoszenia
                    </button>
                    <Link to="/messages">
                        <button className="button3user-ChangeAdd">
                            Wiadomości
                        </button>
                    </Link>
                    <button className="button4user-ChangeAdd">
                        Płatności
                    </button>
                </div>
            </div>

            <div className="containerChangeAdd">
                <div className="containerInChangeAdd">
                    <div className="infoAddChangeAdd">
                        Zaktualizuj swoje ogłoszenie
                    </div>

                    <div className="divChangeAddChangeAdd">


                        <form onSubmit={handleSendChangeAdd}>
                            <div className="inputChangeAdd__group field">
                                <input type="input" className="inputChangeAdd__field" placeholder="Zmień Markę" required="" ref={ChangeMarkaRef}/>
                                    <label htmlFor="name" className="inputChangeAdd__label">Zmień Markę</label>
                            </div>

                            <div className="inputChangeAdd__group field">
                                <input type="input" className="inputChangeAdd__field" placeholder="Zmień Model" required="" ref={ChangeModelRef}/>
                                <label htmlFor="name" className="inputChangeAdd__label">Zmień Model</label>
                            </div>

                            <div className="inputChangeAdd__group field">
                                <input type="input" className="inputChangeAdd__field" placeholder="Zmień Cena" required="" ref={ChangeCenaRef}/>
                                <label htmlFor="name" className="inputChangeAdd__label">Zmień Cena</label>
                            </div>

                            <div className="inputChangeAddLong__group field">
                                <input type="input" className="inputChangeAddLong__field" placeholder="Zmień Opis" required="" ref={ChangeOpisRef}/>
                                <label htmlFor="name" className="inputChangeAddLong__label">Zmień Opis</label>
                            </div>

                            <div className="inputChangeAdd__group field">
                                <input type="input" className="inputChangeAdd__field" placeholder="Zmień Rok produkcji" required="" ref={ChangeRokRef}/>
                                <label htmlFor="name" className="inputChangeAdd__label">Zmień Rok produkcji</label>
                            </div>

                            <button className="button-AddAChangeAdd" type="submit" >
                                Zaktualizuj ogłoszenie
                            </button>

                            </form>
                    </div>
                </div>



                <div className="divChoseAddChangeAdd">


                    <div >

                        {carList.map((car) => (
                            <div className={"offer-search-ChangeAdd"}>

                                <div className={"offer-data-search-ChangeAdd"}>
                                    <div className={"offer-image-ChangeAdd"}>
                                        <img className= {"car-image-ChangeAdd"} src={car.Zdje}/>
                                    </div>
                                    <div className={"offer-text-search-ChangeAdd"}>
                                        <p><strong>Marka: </strong>{car.Marka}</p>
                                        <p><strong>Model: </strong>{car.Model}</p>
                                    </div>
                                    <div className={"offer-text-search-ChangeAdd"}>
                                        <p><strong>Kraj pochodzenia:</strong> {car.Kraj}</p>
                                        <p><strong>Przebieg:</strong> {car.Przebieg}Km</p>
                                    </div>


                                    <div className={"offer-text-search-ChangeAdd"}>
                                        <p><strong>Typ nadwozia:</strong> {car.Nadwozie}</p>
                                        <p><strong>Paliwo:</strong> {car.Paliwo}</p>
                                    </div>
                                    <div className={"offer-text-search-ChangeAdd"}>
                                        <p><strong>Rok produkcji:</strong> {car.Rok}</p>
                                        <p className="price-search-ChangeAdd">Cena:{car.Cena}zł</p>
                                    </div>
                                    <div className={"offer-text-search-ChangeAdd"}>
                                        <p><strong>Opis:</strong> {car.Opis}</p>
                                    </div>

                                    <button className="btnHeartChangeAdd"  onClick={() => handleClickgetIdDoc(car.id)}>
                                        <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503"
                                             className="iconHeartChangeAdd">
                                            <path transform="translate(0 0)"
                                                  d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
                                                  id="Fill"></path>
                                        </svg>
                                    </button>

                                </div>



                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>


    );


}
export default ChangeAdd;