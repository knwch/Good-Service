var admin = require('firebase-admin');
var serviceAccount = require('../../config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://goods-app-ab623.firebaseio.com',
});

module.exports = admin;
