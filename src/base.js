import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA9aDYM-Qm92n_Mu9EMcZqic2_nxJgTpZM",
    authDomain: "countdown-75ef9.firebaseapp.com",
    databaseURL: "https://countdown-75ef9.firebaseio.com",
    projectId: "countdown-75ef9",
    storageBucket: "",
    messagingSenderId: "958741304383",
    appId: "1:958741304383:web:f958aeb9ab5b6ca3"
};
 
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export { base }