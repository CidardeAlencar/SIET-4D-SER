// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

export { db };
