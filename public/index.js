// Firebase uygulamasını başlatmak için
//import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
//import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';

// Firebase yapılandırmanızı buraya ekleyin
const firebaseConfig = {
  apiKey: "AIzaSyCO7-e9DT3uLsk1ej-DXblbOloUgBDm_uc",
  authDomain: "nugo-ea4a5.firebaseapp.com",
  projectId: "nugo-ea4a5",
  storageBucket: "nugo-ea4a5.appspot.com",
  messagingSenderId: "526788026458",
  appId: "1:526788026458:web:f1d09c26fedd94f3313863",
  measurementId: "G-VCFC8SYWFV"
};
import { initializeApp, credential as _credential, firestore } from 'firebase-admin';
import serviceAccount from './nugo-ea4a5-8d8386f986c5.json';

// Firebase'e bağlantı sağlayın
initializeApp({
  credential: _credential.cert(serviceAccount),
  databaseURL: 'https://Nugo.firebaseio.com' // Firebase proje URL'si
});

// Firestore veritabanı nesnesini alın
const db = firestore();

// Örnek bir işlem yapabilirsiniz:
const docRef = db.collection('characters').doc('dota2');
docRef.set({
  name: 'Invoker',
  role: 'Mage'
});
console.log("adsfasdf");
