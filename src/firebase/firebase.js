import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyB0vDw-aTJn4Ee1m9TQN21SMQRndOayZGU',
  authDomain: 'dali-challenge-38899.firebaseapp.com',
  databaseURL: 'https://dali-challenge-38899-default-rtdb.firebaseio.com',
  projectId: 'dali-challenge-38899',
  storageBucket: 'dali-challenge-38899.appspot.com',
  messagingSenderId: '642280029684',
  appId: '1:642280029684:web:69c1a3f12e44e3b08fcda1',
});

export const auth = app.auth();
export default app;
