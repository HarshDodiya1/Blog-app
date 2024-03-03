// Import the functions you need from the SDKs you need
import React from "react";  
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBc5W3sD0hZOaQKFxwwfz2Cm65mPod50iQ",
  authDomain: "blog-app-31d68.firebaseapp.com",
  projectId: "blog-app-31d68",
  storageBucket: "blog-app-31d68.appspot.com",
  messagingSenderId: "1033841777685",
  appId: "1:1033841777685:web:247d37f7e466b02958821c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);