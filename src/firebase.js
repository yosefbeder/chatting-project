import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCt1h_RTazHNrIlUmDns3Fs1aooB_B9jyA',
  authDomain: 'chatty-whatty.firebaseapp.com',
  databaseURL: 'https://chatty-whatty-default-rtdb.firebaseio.com',
  projectId: 'chatty-whatty',
  storageBucket: 'chatty-whatty.appspot.com',
  messagingSenderId: '227921399269',
  appId: '1:227921399269:web:4ce87d78bfae535132b30c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
