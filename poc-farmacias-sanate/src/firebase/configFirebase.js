// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDVUeYVFvwUWyzH1adKIc5D-Ae7qP8M30k",
    authDomain: "poc-farmacias-sanate.firebaseapp.com",
    projectId: "poc-farmacias-sanate",
    storageBucket: "poc-farmacias-sanate.appspot.com",
    messagingSenderId: "340180046991",
    appId: "1:340180046991:web:ec8dcd91343db49d554cfa",
    measurementId: "G-PJH0G77D1K"
};

let instance;

export default function getFirebase() {
    if(typeof window !== 'undefined'){
        if(instance) return instance;
        instance = firebase.initializeApp(firebaseConfig);
        return instance;
    }
    return null;
}
