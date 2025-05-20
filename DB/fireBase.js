import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBSM5cSBkJw-lLpzGb1wpBGaLF4fv_wdPc",
    authDomain: "w-g01-99adb.firebaseapp.com",
    projectId: "w-g01-99adb",
    storageBucket: "w-g01-99adb.firebasestorage.app",
    messagingSenderId: "401987444321",
    appId: "1:401987444321:web:6cf43cf7d7e331536c5420",
    measurementId: "G-FJTWWS9PYF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
