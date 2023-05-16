import '../styles/favourites.css';
import React, {useContext,useState, useEffect, useRef, } from 'react';
import {useNavigate,Link} from "react-router-dom";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import logo from "../assets/img/logov2.png";
import 'firebase/auth';
import {auth, db, storage} from "../firebase";
import {AuthContext} from "../context/AuthContext";
import {getDocs, collection, doc, query, where, limit} from "@firebase/firestore";
import {getDoc, updateDoc} from "firebase/firestore";







function Favourites(props) {
    const {currentUser} = useContext(AuthContext)
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const [carList,setCarList] = useState([]);
    const carCollectionRef = collection(db, "Search-test");
    const [visibility, setVisibility] = useState(false)


    const [isFavourite, setIsFavourite] = useState(false);
    const handleButtonClick = async (carId) => {
        const docRef = doc(db, "Search-test", carId);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const currentData = docSnap.data();
                let newData;
                if (currentData.ulubione === "tak") {
                    newData = { ulubione: "nie" };
                    setIsFavourite(false);
                } else {
                    newData = { ulubione: "tak" };
                    setIsFavourite(true);
                }
                await updateDoc(docRef, newData);
                console.log("Document successfully updated!");
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };





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
        ulubione: "tak"
    })

    function handleChange(event) {
        const {value, name} = event.target
        setregisterForm(prevNote => ({
                ...prevNote, [name]: value
            })
        )
    }

    // const HandleClick = () => {
    //     setVisibility(!visibility);
    //     console.log(registerForm.Marka)
    // }

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
                const ulubione = registerForm.ulubione.toLowerCase();
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
                    (ulubione === '' || values.includes(ulubione)) &&
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



    return (
        <div className="mainuser">

            <div className="navuser">

                <div className="logo-divuser">
                    <a href="http://localhost:3000">
                        <img src={logo} alt="Main.js Logo" className="logo-mainuser"/>
                    </a>

                    <div className="buttongroupus">


                        <div className="Usernamedisp-div">
                            <button className="Usernamedispfav">

                                <span>{currentUser.displayName}</span>

                            </button>
                        </div>
                        <div className="ogloszenie-button-div">
                            <Link to="/AddAnnouncement">
                                <button className="ogloszenie-button">
                                    Dodaj Ogłoszenie
                                </button>
                            </Link>
                        </div>


                    </div>

                </div>
            </div>


            <div className="containerfav1">
                {/*<button className="button-search" type = "button" onClick={HandleClick} style ={{display: visibility ? 'none' : 'block'}}>*/}
                {/*    Szukaj*/}
                {/*</button>*/}

                {/*<button className="button-search" type = "button" onClick={HandleClick} style ={{display: visibility ? 'block' : 'none'}}>*/}
                {/*    Ukryj*/}
                {/*</button>*/}

                <div >
                    {carList.map((car) => (
                        <div className={"offer-search"}>
                            <div className={"offer-image-search"}>
                                <img className= {"car-image"} src={car.Zdje}/>
                            </div>
                            <div className={"offer-data-search"}>
                                <div>
                                    <p className="car-name-search">{car.Marka}
                                        <button className="favourite1" onClick={() => { handleButtonClick(car.id);  }}>Usuń z ulubionych</button>

                                    </p>

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




        </div>

    );


}

export default Favourites;