import 'firebase/storage';

import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCQ-YIBbLpl1SOF7KzaSR0v7HLz61N-yno',
  authDomain: 'reacttestproject-70f65.firebaseapp.com',
  databaseURL: 'https://reacttestproject-70f65.firebaseio.com',
  projectId: 'reacttestproject-70f65',
  storageBucket: 'reacttestproject-70f65.appspot.com',
  messagingSenderId: '899992592973',
  appId: '1:899992592973:web:3d949363094bca6d223204'
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase as default, storage };
