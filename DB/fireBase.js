import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAyfkq8iusQvsxzWWcpzHo4ZVuorVnz2Wo",
    authDomain: "weg1-48504.firebaseapp.com",
    projectId: "weg1-48504",
    storageBucket: "weg1-48504.appspot.com",
    messagingSenderId: "898274545615",
    appId: "1:898274545615:web:aee5445404bf8cd2a44cba",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
