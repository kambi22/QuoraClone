// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkFSVYxf-cHeZTxBq-PHzfpWNW5kL78AA",
  authDomain: "quora-4666c.firebaseapp.com",
  databaseURL: "https://quora-4666c-default-rtdb.firebaseio.com",
  projectId: "quora-4666c",
  storageBucket: "quora-4666c.appspot.com",
  messagingSenderId: "388018313526",
  appId: "1:388018313526:web:2f808b4d61e211ab38bb97",
  measurementId: "G-J41ZHDPP4Q"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);


export default app;