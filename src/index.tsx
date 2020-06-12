import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/messaging';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var firebaseConfig = {
  apiKey: 'AIzaSyDSHj_z7kkw9dlFYHNFdiEvPf49qmU3NPc',
  authDomain: 'remi-rocks.firebaseapp.com',
  databaseURL: 'https://remi-rocks.firebaseio.com',
  projectId: 'remi-rocks',
  storageBucket: 'remi-rocks.appspot.com',
  messagingSenderId: '378122662806',
  appId: '1:378122662806:web:6eba04385503924b5ae3b7',
  measurementId: 'G-NY4QVZ53ZN',
};
// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {}

(window as any).firebase = firebase;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
