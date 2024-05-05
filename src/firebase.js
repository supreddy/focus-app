// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh2kDLCclbmlT-vQdDK2UPude1SNV4a8s",
  authDomain: "apocr-4f5a8.firebaseapp.com",
  projectId: "apocr-4f5a8",
  storageBucket: "apocr-4f5a8.appspot.com",
  messagingSenderId: "364260137891",
  appId: "1:364260137891:web:397fca1fdcaae754571816"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;