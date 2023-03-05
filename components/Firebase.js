// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCxRsjOcO2YTWbtJJHDPEU97VYqZUZIIy0",
  authDomain: "expo-app-b912b.firebaseapp.com",
  projectId: "expo-app-b912b",
  storageBucket: "expo-app-b912b.appspot.com",
  messagingSenderId: "754468027196",
  appId: "1:754468027196:web:a933b1a9c141cf0ba87c39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export const storage = firebase.storage();
export const db = getFirestore(app);
export default firebase;

