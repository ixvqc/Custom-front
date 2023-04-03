import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Main.css';
import car1 from "../assets/img/car1.jpg";


function CarCard(
    {
        ImageCar,
        CarBrand,
        CarPrice,
        ProductionDate,
        CarMileage,
        FuelType
    }) {


    return (

        <div className="popoular-offers-main">

              <div className="car-size">
                  <img src={ImageCar} className="car-size"/>
              </div>

            <div classname="first-line-main">
                <a className="Car-brand-main">
                    {CarBrand} ▪
                </a>
                <a className="Car-price-main">
                    {CarPrice}
                </a>
            </div>

            <div className="second-line-main">
                <a className="Car-production-date-main">
                    {ProductionDate} ▪
                </a>
                <a className="Car-mileage-main">
                    {CarMileage} ▪
                </a>
                <a className="Fuel-type-main">
                    {FuelType}
                </a>

            </div>

        </div>


    );
}

export default CarCard;
