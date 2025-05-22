// src/firebase.js
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBq-XWt_cPfRb59jQ_sjluCp_ewkHOAQUA",
    authDomain: "sense-break-2025.firebaseapp.com",
    projectId: "sense-break-2025",
    storageBucket: "sense-break-2025.firebasestorage.app",
    messagingSenderId: "138551325557",
    appId: "1:138551325557:web:3c40659644c3d6f82bd93c"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
