import firebase from 'firebase/app';

import "firebase/database";

var config = {
    databaseURL: "https://got-coffee.firebaseio.com/",
};
firebase.initializeApp(config);

// Get a reference to the database service
export default firebase.database();
