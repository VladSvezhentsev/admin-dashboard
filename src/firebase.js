import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyBj3KGJJvnMcn887HNiVtaaQl1MPMYBgDI",
   authDomain: "admin-dashboard-4f56f.firebaseapp.com",
   projectId: "admin-dashboard-4f56f",
   storageBucket: "admin-dashboard-4f56f.appspot.com",
   messagingSenderId: "303648174704",
   appId: "1:303648174704:web:2993ef82968c3ac3c37ab5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
