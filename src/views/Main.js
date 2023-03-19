import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import '../styles/Main.css';

function Main() {
    const [name, setName] = useState('Julia')

    useEffect(() => {
        console.log('dupa')
    }, [name])
    return (
        <div className="test">
            <Link to={"/login"}>
                Strona główna<br/>
                {name}<br/>

            </Link>
                <button onClick={()=>setName("Przeenek")}>

                </button>
        </div>
    );
}

export default Main;
