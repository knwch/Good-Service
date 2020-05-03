const admin = require('firebase-admin');
const firebase = require('firebase');
const serviceAccount = require('../../config/serviceAccountKey.json');
const firebaseAccount = require('../../config/firebaseAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://goods-app-ab623.firebaseio.com'
});

firebase.initializeApp(firebaseAccount);

module.exports = {
    admin,
    firebase
};
