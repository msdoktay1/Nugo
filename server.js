const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./nugo-ea4a5-8d8386f986c5.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();