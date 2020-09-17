import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyDVflBKJPhm5bNZfYL5yoqT66NfyiPQgT0",
    authDomain: "messages-598f6.firebaseapp.com",
    databaseURL: "https://messages-598f6.firebaseio.com",
    projectId: "messages-598f6",
    storageBucket: "messages-598f6.appspot.com",
    messagingSenderId: "1044285096751",
    appId: "1:1044285096751:web:f00b017ec43ce7dd2557da",
    measurementId: "G-KRSD66CD2T"
};


const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.firestore()

export { db }
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase