// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCEVVUfJYrgJlE6a15ygG5QPeYm2OAyGYk",
    authDomain: "siet-4d.firebaseapp.com",
    projectId: "siet-4d",
    storageBucket: "siet-4d.appspot.com",
    messagingSenderId: "543821367108",
    appId: "1:543821367108:web:a13dea550176b30fdbf911"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); 

export { db,auth,storage};
