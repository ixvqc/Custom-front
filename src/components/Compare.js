import React, { useContext,useEffect,useState } from 'react'
import '../styles/Compare.css';
import {Link} from "react-router-dom";
import logo from '../assets/img/logov2.png';


const Compare = () => {
    //const cars = localStorage.getItem("compare")
    const [cars, setCars] = useState()
    console.log(cars)

    useEffect(()=> {
        const temp = localStorage.getItem("compare")
        setCars(temp)
    }, [])

    return (
        <div className="nav-search">

            {/*{cars.map((car) => (*/}
            {/*   <p>{car.Marka}</p>*/}
            {/*))}*/}

            </div>
    )

}

export default Compare;