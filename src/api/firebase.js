import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA09cRN6zcHkSi0L9dpgksRYeWmU0_PaWM",
  authDomain: "scheduler-api-68af1.firebaseapp.com",
  databaseURL: "https://scheduler-api-68af1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scheduler-api-68af1",
  storageBucket: "scheduler-api-68af1.appspot.com",
  messagingSenderId: "941604646249",
  appId: "1:941604646249:web:580619f7576928bdc721f8"
};

firebase.initializeApp(firebaseConfig);
//const db = app.database();
//Google auth
var provider = new firebase.auth.GoogleAuthProvider();


//Gets the current user
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};

//Gets if an user is admin
firebase.getIfAdmin = () => {
  firebase.auth()
    .currentUser.getIdTokenResult()
    .then((idTokenResult) => {
      return idTokenResult.claims.admin;
    })
}
//Export

export { firebase, provider };

