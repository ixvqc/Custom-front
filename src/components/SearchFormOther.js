import React from "react";
import { Link } from "react-router-dom";
import '../styles/Main.css';

function SearchFormOther() {
    return (
        <div>
            <div className="input">
                <label className="radio">
                    <input type="radio" value="new" name="criteria-is.new" /> Nowe
                </label>
                <label className="radio">
                    <input type="radio" value="used" name="criteria-is.new" /> Używane
                </label>
                <label className="radio">
                    <input
                        type="radio"
                        value="all-cars"
                        name="criteria-is.new"
                        defaultChecked={true}
                    />{" "}
                    Wszystkie
                </label>
                <br />
            </div>

            <input type="text" className="car-information" placeholder="Dowolne inne cos" />
            <input type="text" className="car-information" placeholder="Dowolny model" />
            <input type="text" className="car-year" placeholder="Rok od" />
            <input type="text" className="car-year" placeholder="Rok do" />
            <input type="text" className="car-price" placeholder="Cena od" />
            <input type="text" className="car-price" placeholder="Cena do" />

            <div className="input">
                <label className="radio">
                    <input type="radio" value="fuel" name="fuel_type" /> Benzyna
                </label>
                <label className="radio">
                    <input type="radio" value="diesel" name="fuel_type" /> Diesel
                </label>
                <label className="radio">
                    <input
                        type="radio"
                        value="all_type"
                        name="fuel_type"
                        defaultChecked={true}
                    />{" "}
                    Wszystkie
                </label>
                <br />
            </div>

            <Link to={"/login"} className="detailed-search">
                Szczegółowe wyszukiwanie
            </Link>
            <button className="search">
                <Link to={"/login"} className="link">
                    Szukaj
                </Link>
            </button>
        </div>
    );
}

export default SearchFormOther;
