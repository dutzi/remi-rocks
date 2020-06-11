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

// function subscribeUser() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(function (reg) {
//       reg.pushManager
//         .subscribe({
//           userVisibleOnly: true,
//           applicationServerKey:
//             'AAAAWAnd85Y:APA91bGTPIJ_ok-M8on05MygXCw75Nhjx_G0NurIVvBX7Q-jKsR0agHL5p_bKVY4XswN4plqjZNtwHuD-OqA3V2baE6rQk9xblMvWR85Tj-cMc97lro05a1AriDh0c2v6qjczImsLzGZ',
//         })
//         .then(function (sub) {
//           console.log('Endpoint URL: ', sub.endpoint);
//         })
//         .catch(function (e) {
//           if (Notification.permission === 'denied') {
//             console.warn('Permission for notifications was denied');
//           } else {
//             console.error('Unable to subscribe to push', e);
//           }
//         });
//     });
//   }
// }

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('sw.js')
//     .then(function (reg) {
//       console.log('Service Worker Registered!', reg);

//       reg.pushManager.getSubscription().then(function (sub) {
//         if (sub === null) {
//           // Update UI to ask user to register for Push
//           console.log('Not subscribed to push service!');
//           subscribeUser();
//         } else {
//           // We have a subscription, update the database
//           console.log('Subscription object: ', sub);
//         }
//       });
//     })
//     .catch(function (err) {
//       console.log('Service Worker registration failed: ', err);
//     });
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
