import firebase from 'firebase/app';
import 'firebase/auth';

    export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyD7akAyn6BajS38xx_5AywkHmShBK33Wsk",
    authDomain: "lezzchat.firebaseapp.com",
    projectId: "lezzchat",
    storageBucket: "lezzchat.appspot.com",
    messagingSenderId: "56551679154",
    appId: "1:56551679154:web:8f8c3ed3ee2478f61955ab"
  }).auth();

  