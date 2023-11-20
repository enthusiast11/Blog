import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO0roVemhRcON1d9itBO69viuk1epKClQ",
  authDomain: "blog-5e9ca.firebaseapp.com",
  projectId: "blog-5e9ca",
  storageBucket: "blog-5e9ca.appspot.com",
  messagingSenderId: "1058815820108",
  appId: "1:1058815820108:web:34eeba2ff8ec8e71bfcfe9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);