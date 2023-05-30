import React, {useContext, useRef, useState} from 'react'
import '../styles/ContactRzeczoznawca.css';
import emailjs from "emailjs-com";


export default function Contact() {
    const [showContact, setShowContact] = useState(false);

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('gmail', 'template', e.target, 'axUsEV1FeXaVWVlLb')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }
    const handleClick = () => {
        setShowContact(true);
    };


    return (
        <div>
            {showContact ? (<>
                <div className="contact-main">
                <div className="container">
                <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Imie" name="name"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email" name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Temat" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Twoja wiadomość" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Skontaktuj się"></input>
                        </div>
                    </div>
                </form>
            </div>
                    <button className="button-contact-x" onClick={()=> setShowContact(false)}>
                        X
                    </button>
                </div>

            </>) : (<>
                <button className="button-contact-adv" onClick={()=> setShowContact(true)}>
                    Skontaktuj się z rzeczoznawcą
                </button>
            </>)}

        </div>
    )
}

