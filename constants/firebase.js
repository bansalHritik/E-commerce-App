import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
const config = {
  apiKey: "AIzaSyB0fgaKYffgrO6U7-ZtQ1er-lP0mwfL2ZA",
  authDomain: "hotel-854f3.firebaseapp.com",
  databaseURL: "https://hotel-854f3.firebaseio.com",
  projectId: "hotel-854f3",
  storageBucket: "hotel-854f3.appspot.com",
  messagingSenderId: "388452432509",
  appId: "1:388452432509:web:6b35568aef0df4de158f14",
  measurementId: "G-PLK32PS7XP",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export { firebase };