import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBLmjTtNjni-SoMP2gLF_Qfz-tmu73gtOI",
  authDomain: "repuestosparcial.firebaseapp.com",
  projectId: "repuestosparcial",
  storageBucket: "repuestosparcial.appspot.com",
  messagingSenderId: "759521660525",
  appId: "1:759521660525:web:fbbcf716005b0971fa3964",
  measurementId: "G-EFKTJVLYRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
