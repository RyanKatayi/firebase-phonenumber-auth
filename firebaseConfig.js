import { FirebaseApp, initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDG-VS34ffY8w_H4kYEH4L5Fbkf02u-nZQ",
    authDomain: "fir-auth-app-19534.firebaseapp.com",
    projectId: "fir-auth-app-19534",
    storageBucket: "fir-auth-app-19534.appspot.com",
    messagingSenderId: "1000486184934",
    appId: "1:1000486184934:web:440f5852c5d9ce9c291827",
    measurementId: "G-YS4KKJB8Y4"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
