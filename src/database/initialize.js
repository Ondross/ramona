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

export function currentUser () {
    this.identifier = "currentUserListener"
    this.on = (callback) => {
        return firebase.auth().onAuthStateChanged(function (user) {
            // var isAnonymous = user.isAnonymous;
            callback(user ? user.uid : undefined)
        })
    }
    this.once = () => new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(function(user) {
        resolve(user ? user.uid : undefined);
      })
    })
}


export const db = firebase.firestore()