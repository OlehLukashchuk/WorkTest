import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDDZD9UHA-dfz-pbco7fL1LYweyN5i3LJE",
  authDomain: "test1-d1611.firebaseapp.com",
  databaseURL: "https://test1-d1611-default-rtdb.firebaseio.com",
  projectId: "test1-d1611",
  storageBucket: "test1-d1611.appspot.com",
  messagingSenderId: "1062275847663",
  appId: "1:1062275847663:web:6a1ec677f10f51bad9921a",
  measurementId: "G-G3V3K1TY84",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };