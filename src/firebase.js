import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth,GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCdff6-Jm_Tg1w7KPLz4t8sjGoOBWp7V1s",
    authDomain: "custom-e30bd.firebaseapp.com",
    databaseURL: "https://custom-e30bd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "custom-e30bd",
    storageBucket: "custom-e30bd.appspot.com",
    messagingSenderId: "602560565295",
    appId: "1:602560565295:web:46e1697d3a99602b9d36da",
    measurementId: "G-QQCVYXJ86R"
};

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
export const firestore = getFirestore(app);
export {provider};