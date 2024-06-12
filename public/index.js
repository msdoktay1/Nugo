import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';

//import serviceAccount from './nugo-ea4a5-8d8386f986c5.json';

initializeApp({
  credential: applicationDefault()
});

// Firestore örneğini alın
const db = firebase.firestore();

// Veri eklemek için bir fonksiyon
function addDataToFirestore() {
  // Yeni bir doküman ekleyin
  db.collection("your_collection").add({
    field1: "value1",
    field2: "value2",
    // ... diğer alanlar
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

// Fonksiyonu çağırarak Firestore'a veri ekleyin
addDataToFirestore();