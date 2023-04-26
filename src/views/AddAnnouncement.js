import {Link} from "react-router-dom";
import {useState, useEffect,useNavigate} from "react";
import '../styles/AddAnnouncement.css';
import logo from '../assets/img/logov2.png';
import axios from "axios";
import React, { useRef } from "react";
import {firestore} from "../firebase";
import {addDoc,collection,setDoc} from "@firebase/firestore";
import {storage} from "../firebase";
import styled, { css } from 'styled-components';
import Select from "react-select";
import auto from "../assets/img/car.png";
import autoHighlights from "../assets/img/carHighlights.png";
import moto from "../assets/img/motorbike.png";
import motoHighlights from "../assets/img/motorbikeHighlights.png";
import key from "../assets/img/car-key.png";
import keyHighlights from "../assets/img/car-keyHighlights.png";
import { db, auth, app } from '../firebase'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";








const AddAnnouncement = () => {



    const storage = getStorage();
    const firestore = getFirestore();

    const [imageSrc, setImageSrc] = useState(auto);
    function handleClick(src) {
        setImageSrc(src);
    }

    const [carsOff, setCarsOff] = useState(false);
    const [motorOff, setMotorOff] = useState(true);
    const [otherOff, setOtherOff] = useState(true);
    const navigate = useNavigate();

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



    const [optionsMarka, setOptionsMarka] = useState([]);
    useEffect(() => {
        // Fetch options from API or any data source
        // Here is an example options array
        const optionsArrayMarka = [
            { value: 'Toyota', label: 'Toyota' },
            { value: 'Ford ', label: 'Ford' },
            { value: 'BMW ', label: 'BMW' },
            { value: 'Audi ', label: 'Audi' },
            { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
            { value: 'Volkswagen', label: 'Volkswagen' },
            { value: 'Porsche ', label: 'Porsche' },
            { value: 'Jeep ', label: 'Jeep' },
            { value: 'Tesla ', label: 'Tesla' },
            { value: 'Mazda', label: 'Mazda' },
        ];
        setOptionsMarka(optionsArrayMarka);
    }, []);

    const [optionsModel, setOptionsModel] = useState([]);
    useEffect(() => {
        // Fetch options from API or any data source
        // Here is an example options array
        const optionsArrayModel = [
            { value: 'Corolla', label: 'Corolla' },
            { value: 'Mustang', label: 'Mustang' },
            { value: 'M5', label: 'M5' },
            { value: 'Q5', label: 'Option 4' },
            { value: 'S-Class', label: 'S-Class' },
            { value: 'Golf', label: 'Golf' },
            { value: '911', label: '911' },
            { value: 'Wrangler', label: 'Wrangler' },
            { value: 'Model S', label: 'Model S' },
            { value: 'MX-5', label: 'MX-5' },
        ];
        setOptionsModel(optionsArrayModel);
    }, []);

    const [optionsNaped, setOptionsNapend] = useState([]);
    useEffect(() => {
        // Fetch options from API or any data source
        // Here is an example options array
        const optionsArrayNapend = [
            { value: 'FWD (napęd na przednią oś)', label: 'FWD' },
            { value: 'RWD (napęd na tylną oś) ', label: 'RWD' },
            { value: '4WD (napęd na cztery koła)', label: '4WD' },
        ];
        setOptionsNapend(optionsArrayNapend);
    }, []);

    const [optionsSkrzynia, setOptionsSkrzynia] = useState([]);
    useEffect(() => {
        // Fetch options from API or any data source
        // Here is an example options array
        const optionsArraySkrzynia = [
            { value: 'Skrzynia manualna', label: 'Skrzynia manualna' },
            { value: 'Skrzynia automatyczna stopniowa ', label: 'Skrzynia automatyczna stopniowa' },
            { value: 'Skrzynie półautomatyczna stopniowa', label: 'Skrzynie półautomatyczna stopniowa' },
        ];
        setOptionsSkrzynia(optionsArraySkrzynia);
    }, []);

    const [optionsOriginCountry, setOptionsOriginCountry] = useState([]);
    useEffect(() => {
        // Fetch options from API or any data source
        // Here is an example options array
        const optionsArrayOriginCountry = [
            { value: 'Albania', label: 'Albania' },
            { value: 'Andora', label: 'Andora' },
            { value: 'Austria', label: 'Austria' },
            { value: 'Belgia', label: 'Belgia' },
            { value: 'Białoruś', label: 'Białoruś' },
            { value: 'Bośnia i Hercegowina', label: 'Bośnia i Hercegowina' },
            { value: 'Bułgaria', label: 'Bułgaria' },
            { value: 'Chorwacja', label: 'Chorwacja' },
            { value: 'Czarnogóra', label: 'Czarnogóra' },
            { value: 'Czechy', label: 'Czechy' },
            { value: 'Dania', label: 'Dania' },
            { value: 'Estonia', label: 'Estonia' },
            { value: 'Finlandia', label: 'Finlandia' },
            { value: 'Francja', label: 'Francja' },
            { value: 'Grecja', label: 'Grecja' },
            { value: 'Hiszpania', label: 'Hiszpania' },
            { value: 'Holandia', label: 'Holandia' },
            { value: 'Irlandia', label: 'Irlandia' },
            { value: 'Islandia', label: 'Islandia' },
            { value: 'Liechtenstein', label: 'Liechtenstein' },
            { value: 'Litwa', label: 'Litwa' },
            { value: 'Luksemburg', label: 'Luksemburg' },
            { value: 'Łotwa', label: 'Łotwa' },
            { value: 'Macedonia Północna', label: 'Macedonia Północna' },
            { value: 'Malta', label: 'Malta' },
            { value: 'Mołdawia', label: 'Mołdawia' },
            { value: 'Monako', label: 'Monako' },
            { value: 'Niemcy', label: 'Niemcy' },
            { value: 'Norwegia', label: 'Norwegia' },
            { value: 'Polska', label: 'Polska' },
            { value: 'Portugalia', label: 'Portugalia' },
            { value: 'Rosja', label: 'Rosja' },
            { value: 'Rumunia', label: 'Rumunia' },
            { value: 'San Marino', label: 'San Marino' },
            { value: 'Serbia', label: 'Serbia' },
            { value: 'Słowacja', label: 'Słowacja' },
            { value: 'Słowenia', label: 'Słowenia' },
            { value: 'Szwajcaria', label: 'Szwajcaria' },
            { value: 'Szwecja', label: 'Szwecja' },
            { value: 'Ukraina', label: 'Ukraina' },
            { value: 'Watykan', label: 'Watykan' },
            { value: 'Węgry', label: 'Węgry' },
            { value: 'Wielka Brytania', label: 'Wielka Brytania' },
        ];
        setOptionsOriginCountry(optionsArrayOriginCountry);
    }, []);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            fontSize: '16px',
            display: 'block',
            width: '200px',
            border: 'none',
            borderBottom: '1px solid #515151',
            background: 'transparent',
            backgroundColor: 'white',
            '&:focus-within': { boxShadow: '0 0 0px #888' },

        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '16px',
            display: 'block',
            width: '200px',
            border: 'none',
            background: 'transparent',
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: '16px',
            display: 'block',
            width: '200px',
            border: 'none',
            background: 'transparent',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            //display: 'none',
            marginLeft: '160px',
            marginTop: '-40px',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            paddingBottom: '0px',
        }),


    };


    const messageRef = useRef();
    const priceRef = useRef();
    const prodYearRef = useRef();
    const mileageRef = useRef();
    const VINRef = useRef();
    const powerRef = useRef();
    const EngcapRef = useRef();
    const ColorRef = useRef();
    const DateRef = useRef();
    const DescRef = useRef();
    const NameRef = useRef();
    const PhoneRef = useRef();
    const emailRef = useRef();
    const refFirestore= collection(firestore,"Announcement");
    const [selectedMarka, setSelectedMarka] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedNaped, setSelectedNaped] = useState(null);
    const [selectedSkrzynia, setSelectedSkrzynia] = useState(null);
    const [selectedOriginCountry, setSelectedOriginCountry] = useState(null);
    const [selectedStanTechniczny, setSelectedStanTechniczny] = useState(null);
    const [selectedFuel, setSelectedFuel] = useState(null);
    const [selectedCarBody, setSelectedCarBody] = useState(null);

    const handleFuelChange = (event) => {
        setSelectedFuel(event.target.value);
    }
    const handleStanTechnicznyChange = (event) => {
        setSelectedStanTechniczny(event.target.value);
    }

    const handleCarBodyChange = (event) => {
        setSelectedCarBody(event.target.value);
    }

    const handleSave = async (event) => {
        const { uid, photoURL } = auth.currentUser
        event.preventDefault();

        const formData = {
            uid: uid,
            photoURL: photoURL,
            marka: selectedMarka,
            model: selectedModel,
            tytul: messageRef.current.value,
            cena: priceRef.current.value,
            RokProdukcji: prodYearRef.current.value,
            Przebieg: mileageRef.current.value,
            Moc: powerRef.current.value,
            PojemnoscSlinika: EngcapRef.current.value,
            VIN: VINRef.current.value,
            stanTechniczny: selectedStanTechniczny,
            RodzajPaliwa: selectedFuel,
            RodzajNapedu: selectedNaped,
            SkrzyniaBiegow: selectedSkrzynia,
            RodzajNadwozia: selectedCarBody,
            Kolor: ColorRef.current.value,
            DataPierwszejRejestracji: DateRef.current.value,
            KrajPochodzenia: selectedOriginCountry,
            Opis: DescRef.current.value,
            Imie: NameRef.current.value,
            NrTelefonu: PhoneRef.current.value,
            Email: emailRef.current.value,

        };

        try {
            const docRef = await addDoc(refFirestore, formData);
            // Upload images to Firebase Storage
            for (let i = 0; i < selectedImages.length; i++) {
                const imageFile = selectedImages[i];
                const imageRef = storageRef(storage, `images/${docRef.id}/image_${i}.jpg`);
                console.log(imageFile);

                if (typeof imageFile === 'string' && imageFile.startsWith('blob:')) {
                    const response = await fetch(imageFile);
                    const blob = await response.blob();
                    const file = new File([blob], `image_${i}.jpg`, { type: blob.type });
                    await uploadBytes(imageRef, file);
                    const imageUrl = await getDownloadURL(imageRef);
                    await setDoc(doc(firestore, "Announcement", docRef.id), { images: { [i]: imageUrl } }, { merge: true });
                } else {
                    await uploadBytes(imageRef, imageFile);
                    const imageUrl = await getDownloadURL(imageRef);
                    await setDoc(doc(firestore, "Announcement", docRef.id), { images: { [i]: imageUrl } }, { merge: true });
                }
            }
            for (let i = 0; i < selectedImagesAkt.length; i++) {
                const imageFileAkt = selectedImagesAkt[i];
                const imageRefAkt = storageRef(storage, `act/${docRef.id}/image_${i}.jpg`);
                console.log(imageFileAkt);

                if (typeof imageFileAkt === 'string' && imageFileAkt.startsWith('blob:')) {
                    const response = await fetch(imageFileAkt);
                    const blob = await response.blob();
                    const file = new File([blob], `image_${i}.jpg`, { type: blob.type });
                    await uploadBytes(imageRefAkt, file);
                    const imageUrl = await getDownloadURL(imageRefAkt);
                    await setDoc(doc(firestore, "Announcement", docRef.id), { act: { [i]: imageUrl } }, { merge: true });
                } else {
                    await uploadBytes(imageRefAkt, imageFileAkt);
                    const imageUrl = await getDownloadURL(imageRefAkt);
                    await setDoc(doc(firestore, "Announcement", docRef.id), { act: { [i]: imageUrl } }, { merge: true });
                }
            }
            console.log('Dane zostały dodane do Firestore z ID: ', docRef.id);
            navigate("/")
        } catch (e) {
            console.error('Błąd dodawania danych do Firestore: ', e);
        }
    };


    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));

        // FOR BUG IN CHROME
        event.target.value = "";
    };

    function deleteHandler(image) {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }



    const [selectedImagesAkt, setSelectedImagesAkt] = useState([]);

    const onSelectFileAkt = (event) => {
        const selectedFilesAkt = event.target.files;
        const selectedFilesArrayAkt = Array.from(selectedFilesAkt);

        const imagesArrayAkt = selectedFilesArrayAkt.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImagesAkt((previousImagesAkt) => previousImagesAkt.concat(imagesArrayAkt));

        // FOR BUG IN CHROME
        event.target.value = "";
    };

    function deleteHandlerAkt(image) {
        setSelectedImagesAkt(selectedImagesAkt.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }


    return (
        <div className="background-Add">
            <nav >
                <a href="http://localhost:3000">
                    <img src={logo} alt="Main.js Logo" className="logo_Add" />
                </a>
            </nav>
            <div className="backgournd-Add-In">

                <div className="filters-line-Add">
                    <img src={imageSrc === auto ? autoHighlights : auto} onClick={() => { handleClick(auto); hideCarsClick(); }} className="choices-logo-Add"/>
                    <img src={imageSrc === moto ? motoHighlights : moto} onClick={() => { handleClick(moto); hideMotorClick();}} className="choices-moto-Add"/>
                    <img src={imageSrc === key ? keyHighlights : key} onClick={() => { handleClick(key); hideOtherClick(); }} className="choices-key-Add"/><br />
                    <text className="text-choices-Add">Osobowe</text>
                    <text className="text-choices-Add">Motocykle</text>
                    <text className="text-choices-Add">Inne</text>
                </div>
                <form onSubmit={handleSave}>
                    <div className="titleAdd">
                        Tytuł Ogłoszenia
                    </div>

                    <div className="chooseAddMarka" >
                        <Select options={optionsMarka} className="SelectAdd" styles={customStyles} placeholder="Marka" value={selectedMarka} onChange={option => setSelectedMarka(option)}/>
                    </div>

                    <div className="chooseAddModel" >
                        <Select options={optionsModel} className="SelectAdd" styles={customStyles} placeholder="Model" value={selectedModel} onChange={option => setSelectedModel(option)}/>
                    </div>


                    <div className="addtitleAdd">
                        <input required="" type="text" className="inputAvAdd" ref={messageRef}/>
                        <span className="highlightAvAdd"></span>
                        <span className="barAvAdd"></span>
                        <label className="labelAvAdd" >Tytuł Ogłoszenia</label>
                    </div>

                    <div className="priceTitleAdd">
                        Cena
                    </div>
                    <div className="PriceAdd">
                        <input required="" type="text" className="inputAvAddPrice" ref={priceRef}/>
                        <span className="highlightAvAddPrice"></span>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >Cena</label>
                    </div>

                    <div className="technicaldataTitleAdd">
                        Dane techniczne
                    </div>



                    <div className="ProdYearAdd">
                        <input required="" type="text" className="inputAvAddPrice" ref={prodYearRef}/>
                        <span className="highlightAvAddPrice"></span>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >Rok produkcji</label>
                    </div>

                    <div className="MileageAdd">
                        <input required="" type="text" className="inputAvAddPrice" ref={mileageRef}/>
                        <span className="highlightAvAddPrice"></span>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >Przebieg</label>
                    </div>

                    <div className="VinAdd">
                        <input required="" type="text" className="inputAvAddPrice" ref={VINRef}/>
                        <span className="highlightAvAddPrice"></span>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >VIN</label>
                    </div>

                    <div className="ContNewAdd">
                        <div className="nameNewAdd">
                            <label >
                                <span className="name">Stan Techniczny</span>
                            </label>
                        </div>
                        <div className="radioinputsNewAdd">
                            <label className="radio">
                                <input type="radio" name="radio" value="Nowy" onChange={handleStanTechnicznyChange} />
                                <span className="name">Nowy</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radio" value="Używany" onChange={handleStanTechnicznyChange} />
                                <span className="name">Używany</span>
                            </label>

                            <label className="radio">
                                <input type="radio" name="radio" value={"Uszkodzony"} onChange={handleStanTechnicznyChange} />
                                <span className="name">Uszkodzony</span>
                            </label>
                        </div>
                    </div>

                    <div className="ContFuelAdd">
                        <div className="nameNewAdd">
                            <label >
                                <span className="name">Rodzaj paliwa</span>
                            </label>
                        </div>
                        <div className="radioinputsFuelAdd">
                            <label className="radio">
                                <input type="radio" name="radioFuel" value="Benzyna" onChange={handleFuelChange} />
                                <span className="name">Benzyna</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radioFuel" value="Disel" onChange={handleFuelChange} />
                                <span className="name">Disel</span>
                            </label>

                            <label className="radio">
                                <input type="radio" name="radioFuel" value={"Elektryczny"} onChange={handleFuelChange} />
                                <span className="name">Elektryczny</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radioFuel" value={"LPG"} onChange={handleFuelChange} />
                                <span className="name">LPG</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radioFuel" value={"Hybrydowe"} onChange={handleFuelChange} />
                                <span className="name">Hybrydowe</span>
                            </label>
                        </div>
                    </div>


                    <div className="technicaldataTitleAdd">
                        Szczegółowe dane techniczne
                    </div>
                    <div className="chooseAddMarka" >
                        <Select options={optionsNaped} className="SelectAdd" styles={customStyles} placeholder="Rodzaj napędu" value={selectedNaped} onChange={option => setSelectedNaped(option)}/>
                    </div>

                    <div className="chooseAddModel" >
                        <Select options={optionsSkrzynia} className="SelectAdd" styles={customStyles} placeholder="Skrzynia biegów" value={selectedSkrzynia} onChange={option => setSelectedSkrzynia(option)}/>
                    </div>

                    <div className="PowerAdd">
                        <input required="" type="text" className="inputAvAddPrice" ref={powerRef}/>
                        <span className="highlightAvAddPrice"></span>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >Moc</label>
                    </div>

                    <div className="EngCapacityAdd">
                        <input required="" type="text" className="inputAvAddPrice" ref={EngcapRef}/>
                        <span className="highlightAvAddPrice"></span>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >Pojemność silnika</label>
                    </div>


                    <div className="technicaldataTitleAdd">
                        Nadwozie
                    </div>

                    <div className="ContFuelAdd">
                        <div className="nameNewAdd">
                            <label >
                                <span className="name">Typ nadwozia</span>
                            </label>
                        </div>
                        <div className="radioinputsCarBodyAdd">
                            <label className="radio">
                                <input type="radio" name="radioFuel" value="Coupe" onChange={handleCarBodyChange} />
                                <span className="name">Coupe</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radioFuel" value="Hatchback" onChange={handleCarBodyChange} />
                                <span className="name">Hatchback</span>
                            </label>

                            <label className="radio">
                                <input type="radio" name="radioFuel" value={"Pickup"} onChange={handleCarBodyChange} />
                                <span className="name">Pickup</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radioFuel" value={"Sedan"} onChange={handleCarBodyChange} />
                                <span className="name">Sedan</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radioFuel" value={"Terenowy"} onChange={handleCarBodyChange} />
                                <span className="name">Terenowy</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radioFuel" value={"Suv"} onChange={handleCarBodyChange} />
                                <span className="name">Suv</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radioFuel" value={"Kabriolet"} onChange={handleCarBodyChange} />
                                <span className="name">Kabriolet</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radioFuel" value={"Limuzyna"} onChange={handleFuelChange} />
                                <span className="name">Limuzyna</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radioFuel" value={"Inny"} onChange={handleFuelChange} />
                                <span className="name">Inny</span>
                            </label>
                        </div>
                    </div>

                    <div className="PowerAdd">
                        <input required="" type="text" className="inputAvAddPrice" ref={ColorRef}/>
                        <span className="highlightAvAddPrice"></span>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >Kolor</label>
                    </div>


                    <div className="technicaldataTitleAdd">
                        Historia Pojazdu
                    </div>

                    <div className="PowerAdd">
                        <input required="" type="date" className="inputAvAddPrice" ref={DateRef}/>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >Data pierwszej rejestracji</label>
                    </div>

                    <div className="OriginCountry" >
                        <Select options={optionsOriginCountry} className="SelectAdd" styles={customStyles} placeholder="Kraj pochodzenia" value={selectedOriginCountry} onChange={option => setSelectedOriginCountry(option)}/>
                    </div>


                    <div className="technicaldataTitleAdd">
                        Opis
                    </div>

                    <div className="DescriptionAdd">
                        <textarea required="" className="inputAvAddDesc" rows="9" ref={DescRef}></textarea>
                        <span className="barAvAddDesc"></span>
                        <label className="labelAvAddDesc">Opis (minimum 30 znaków)</label>
                    </div>

                    <div className="technicaldataTitleAdd">
                        Zdjęcia
                    </div>

                    <section className="AddMultiImgSectionAdd">
                        <label className="AddMultiImgLabelAdd">
                            + Dodaj zdjęcia
                            <br />
                            <input
                                type="file"
                                className="AddMultiImgInputAdd"
                                name="images"
                                onChange={onSelectFile}
                                multiple
                                accept="image/png , image/jpeg, image/webp"
                            />
                        </label>
                        <br />

                        <input type="file" multiple className="AddMultiImgInputAdd" />


                        <div className="AddMultiImgDivImagesAdd">
                            {selectedImages &&
                                selectedImages.map((image, index) => {
                                    return (
                                        <div key={image} className="AddMultiImgButtonImgAdd">
                                            <img src={image} height="200" alt="upload" className="AddMultiImgImgAdd" />
                                            <button onClick={() => deleteHandler(image)}>
                                                delete image
                                            </button>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>

                    <div className="technicaldataTitleAdd">
                        Dane kontaktowe
                    </div>

                    <div className="ProdYearAdd">
                        <input required="" type="text" className="inputAvAddPrice" ref={NameRef}/>
                        <span className="highlightAvAddPrice"></span>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >Imie</label>
                    </div>

                    <div className="MileageAdd">
                        <input required="" type="number" className="inputAvAddPrice" ref={PhoneRef}/>
                        <span className="highlightAvAddPrice"></span>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >Nr telefonu</label>
                    </div>

                    <div className="VinAdd">
                        <input required="" type="text" className="inputAvAddPrice" ref={emailRef}/>
                        <span className="highlightAvAddPrice"></span>
                        <span className="barAvAddPrice"></span>
                        <label className="labelAvAddPrice" >Email</label>
                    </div>


                    <div className="technicaldataTitleAdd">
                        Akt rzeczoznawcy
                    </div>

                    <section className="AddMultiImgSectionAdd">
                        <label className="AddMultiImgLabelAdd">
                            + Dodaj plik
                            <br />
                            <span>png, jpeg, webp lub pdf</span>
                            <input
                                type="file"
                                className="AddMultiImgInputAdd"
                                name="images"
                                onChange={onSelectFileAkt}
                                multiple
                                accept="image/png, image/jpeg, image/webp, application/pdf"
                            />
                        </label>
                        <br />

                        <input type="file" multiple className="AddMultiImgInputAdd" />


                        <div className="AddMultiImgDivImagesAdd">
                            {selectedImagesAkt &&
                                selectedImagesAkt.map((imageAkt, index) => {
                                    return (
                                        <div key={imageAkt} className="AddMultiImgButtonImgAdd">
                                            <img src={imageAkt} height="200" alt="upload" className="AddMultiImgImgAdd" />
                                            <button onClick={() => deleteHandlerAkt(imageAkt)}>
                                                delete image
                                            </button>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>


                    <div className="rulesAddAvd">
                        <div className="rulesTextAddAvd">
                            Polityka prywatności to dokument, który powinna posiadać każda strona internetowa. Zawiera ona informacje o tym, kto jest administratorem danych osobowych, jakie dane użytkowników strony internetowej podlegają gromadzeniu, jaki jest cel przetwarzania danych oraz przez jaki okres dane te będą przetwarzane. Ponadto informuje ona o plikach cookies oraz bezpieczeństwie zbieranych danych osobowych.
                            Jeśli strona internetowa przewiduje również sprzedaż towarów lub usług, powinna ponadto zawierać regulamin sklepu internetowego. Ponadto zaleca się, aby strona posiadała również Ogólne warunki użytkowania strony internetowej.
                        </div>
                    </div>

                    <button className="button-AddAdvAdd" type="submit" >
                        Dodaj ogłoszenie
                    </button>


                </form>
            </div>

        </div>
    );
};

export default AddAnnouncement;