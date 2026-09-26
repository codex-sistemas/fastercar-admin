// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-2w5hkEQOE76Z1v-Wc2rTfnj0izBwmIU",
    authDomain: "faster-59749.firebaseapp.com",
    projectId: "faster-59749",
    storageBucket: "faster-59749.firebasestorage.app",
    messagingSenderId: "513642216852",
    appId: "1:513642216852:web:48ea5dce5c250678776381"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()



window.FIREBASE = {}

window.FIREBASE.loginGoogle = async () => {
    try {

        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);

        const user = result.user;
        const token = await user.getIdToken();

        return {
            user,
            token
        };

    } catch (error) {
        console.log("CODE:", error.code);
        console.log("MESSAGE:", error.message);
        console.log("FULL ERROR:", error);
    }
}


window.FIREBASE.signOut = async () => {
    try {
        await signOut(auth);
        console.log("sair do login")
    } catch (error) {
        console.log(error)
    }
}


onAuthStateChanged(auth, user => {
    const isLoginPage = window.location.pathname.includes("/login/");
    window.FIREBASE.user = user;

    if (user) {
        // Dashboard (Login realizado)
        init()

    } else if (isLoginPage && user) {
        // Login (Login Realizado)
        // Indo para Dashboard
        window.location.href = "../";

    } else if (!isLoginPage) {
        // Dashboard (Login pendente)
        window.location.href = "./login/";
    }
});