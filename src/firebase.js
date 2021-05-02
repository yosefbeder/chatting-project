import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCt1h_RTazHNrIlUmDns3Fs1aooB_B9jyA',
  authDomain: 'chatty-whatty.firebaseapp.com',
  projectId: 'chatty-whatty',
  storageBucket: 'chatty-whatty.appspot.com',
  messagingSenderId: '227921399269',
  appId: '1:227921399269:web:168a20dbb65c428932b30c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
