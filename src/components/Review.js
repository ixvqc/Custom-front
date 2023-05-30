import React, {useContext, useRef, useState} from 'react'
import '../styles/Review.css';
import {addDoc, collection} from "@firebase/firestore";
import {db,auth} from "../firebase";
import { getFirestore, updateDoc,getDoc } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function Review() {
    const [showReview, setShowReview] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [visibility2, setVisibility2] = useState(false);
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
    const [carID, setCarID] = useState('');
    const [reviewText, setReviewText] = useState("");
    const [carList,setCarList] = useState([]);

        const handleClick = () => {
        setShowReview(true);
    };
    const ZmianaPrzycisku1 = () => {
        setVisibility(!visibility);
        console.log(registerForm.Marka)
    }
    const ZmianaPrzycisku2 = () => {
        setVisibility2(!visibility2);
    }

function onClicks() {
    ZmianaPrzycisku2()
    setShowReview(true)


}

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


    return (
        <div>
            {showReview ? (<>
                <div className="review-main">

                    <div className={"review-window"} id ={"offer-review-search"} style ={{display: visibility2 ? 'block' : 'none'}}>
                        <textarea id = {"offer-review-text-search"} value={reviewText} onChange={(e) => setReviewText(e.target.value)}>
                            Napisz swoją recenzję tutaj
                        </textarea>
                    </div>

                    <button className="button-x" onClick={()=> setShowReview(false)}>
                        X
                    </button>
                </div>


            </>) : (<>

                {carList.map((car) => (
                    <div className={"review"} key={car.id}> {/* Added key attribute */}


                    <button id={"review-button-search"} className="button-review" type = "button"
                            onClick={(event) => addField(event, car.id)}
                            style ={{display: visibility2 ? 'block' : 'none'}}>

                    Wyślij recenzję
                </button>
                        <button>elo</button>
                    </div>
                        ))}
                <button className="button-review"
                        type = "button" onClick={()=> onClicks()}
                        style ={{display: visibility2 ? 'none' : 'block'}}>

                    Napisz recenzję
                </button>



            </>)}

        </div>
    )
}

