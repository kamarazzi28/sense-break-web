// src/firebase.js
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCA1ID4pMO0T-BBun_QCJW6BFwCYsK1ao",
    authDomain: "sense-break7.firebaseapp.com",
    projectId: "sense-break7",
    storageBucket: "sense-break7.appspot.com",
    messagingSenderId: "710329466038",
    appId: "1:710329466038:web:55566c6bb872a7ea543013f",
    measurementId: "G-ZFRZGWRDR2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
