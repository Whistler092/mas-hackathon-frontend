importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyADS7nudI5gfmJU-fU3FS7TC9M624_q95Q',
  authDomain: 'hackathon-gotzero.firebaseapp.com',
  databaseURL: 'https://hackathon-gotzero.firebaseio.com',
  projectId: 'hackathon-gotzero',
  storageBucket: 'hackathon-gotzero.appspot.com',
  messagingSenderId: '493747976045',
  appId: '1:493747976045:web:2bd5d52db9f5b5caa14c64',
  measurementId: 'G-H16E7FQTKB'
});

const messaging = firebase.messaging();
