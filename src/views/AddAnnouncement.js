import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/AddAnnouncement.css';
import logo from '../assets/img/logov2.png';
import axios from "axios";
import React, { useRef } from "react";
import {firestore} from "../firebase";
import {addDoc,collection} from "@firebase/firestore";
import {storage} from "../firebase";
import {ref, uploadBytes, listAll,getDownloadURL} from "firebase/storage";
import styled, { css } from 'styled-components';
import Select from "react-select";
import auto from "../assets/img/car.png";
import autoHighlights from "../assets/img/carHighlights.png";
import moto from "../assets/img/motorbike.png";
import motoHighlights from "../assets/img/motorbikeHighlights.png";
import key from "../assets/img/car-key.png";
import keyHighlights from "../assets/img/car-keyHighlights.png";







const AddAnnouncement = () => {

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



    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            fontSize: '16px',
            padding: '10px 10px 10px 5px',
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
            padding: '10px 10px 10px 5px',
            display: 'block',
            width: '200px',
            border: 'none',
            background: 'transparent',
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: '16px',
            padding: '10px 10px 10px 5px',
            display: 'block',
            width: '200px',
            border: 'none',
            background: 'transparent',
        }),
        // dropdownIndicator: (provided, state) => ({
        //     ...provided,
        //     display: 'none',
        // }),



    };


    const messageRef = useRef();
    const refFirestore= collection(firestore,"Ogloszenia");
    const [selectedMarka, setSelectedMarka] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);

    const handleSave = async (event) => {
        event.preventDefault();
        const formData = {
            marka: selectedMarka,
            model: selectedModel,
            tytul: messageRef.current.value,
        };

        try {
            const docRef = await addDoc(refFirestore, formData);
            console.log('Dane zostały dodane do Firestore z ID: ', docRef.id);
        } catch (e) {
            console.error('Błąd dodawania danych do Firestore: ', e);
        }
    };



    return (
        <div className="background-Add">

            <nav className="logo-container">
                <a href="http://localhost:3000">
                    <img src={logo} alt="Main.js Logo" className="logo_Add" />
                </a>
            </nav>

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
                    Tutuł Ogłoszenia
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

                <button className="button-AddAdvAdd" type="submit" >
                    Zaloguj się
                </button>

            </form>
        </div>
    );
};

export default AddAnnouncement;