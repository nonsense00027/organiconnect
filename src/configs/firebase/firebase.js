// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBcXtzfrCH5hTta__aNcKZhz9j6nXgJ0HY",
//   authDomain: "organiconnect-fc298.firebaseapp.com",
//   projectId: "organiconnect-fc298",
//   storageBucket: "organiconnect-fc298.appspot.com",
//   messagingSenderId: "822059439726",
//   appId: "1:822059439726:web:efd00773ba30761af1f87f",
// };

const firebaseConfig = {
  apiKey: "AIzaSyACI5NgbTc1yFZGctP9aP0eYDvtMifJ_zI",
  authDomain: "organiconnect-a2ebb.firebaseapp.com",
  projectId: "organiconnect-a2ebb",
  storageBucket: "organiconnect-a2ebb.appspot.com",
  messagingSenderId: "426650808036",
  appId: "1:426650808036:web:c37632bfffc0afaea686f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
