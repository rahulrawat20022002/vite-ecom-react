// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD-gm38_II2dcJN8yq0RmFhPwCEUyD-sBI",
  authDomain: "firstecom-fdba9.firebaseapp.com",
  projectId: "firstecom-fdba9",
  storageBucket: "firstecom-fdba9.appspot.com",
  messagingSenderId: "381922592989",
  appId: "1:381922592989:web:60682b95fafb41ef533334",
  measurementId: "G-GDK01NPLR0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
