import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDrGHkOmatTF6kKLnj7vVWOr6CaJxZuRJs',
  authDomain: 'guidbtoledo.firebaseapp.com',
  databaseURL: 'https://guidbtoledo-default-rtdb.firebaseio.com',
  projectId: 'guidbtoledo',
  storageBucket: 'guidbtoledo.appspot.com',
  messagingSenderId: '764105401722',
  appId: '1:764105401722:web:d4ae0e50e749cdb22ae2c3',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
  

//Link:https://console.firebase.google.com/project/guidbtoledo/database/guidbtoledo-default-rtdb/data?hl=pt-br

