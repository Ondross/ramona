const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAynqIucYELMUpGTPfgPD3c8HB5MRTpXoY",
    authDomain: "ramona-heine.firebaseapp.com",
    databaseURL: "https://ramona-heine.firebaseio.com",
    projectId: "ramona-heine",
    storageBucket: "ramona-heine.appspot.com",
    messagingSenderId: "1053506851156",
    appId: "1:1053506851156:web:4d8aa40df5d62d943938c1",
    measurementId: "G-T44QTYBERM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().signInAnonymously()

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        // ...
    } else {
        // User is signed out.
        // ...
    }

});


export default firebase.firestore()