import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Main.css';




function Main() {

    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };
    const buttonColor = isHovered ? '#fdd852' : '#FDCF28';

    return (
        <div className="main">
            <div className="nav">
                <Link to={"/login"} className="link">
                    Zaloguj się
                </Link>
                <Link to={"/register"} className="link">
                        Rejestracja
                </Link>
                <button className="add-adv"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                style={{ backgroundColor: buttonColor }}>
               Dodaj ogłoszenie +
            </button>

            </div>
            <div className="image_background">
                <div className="filters">

                </div>
            </div>
        </div>


        );
}

export default Main;
