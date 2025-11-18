import { initializeApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCP0KOC-GCqe1S314k-vX40WDWC6OPv08o",
  authDomain: "genuinely-29c37.firebaseapp.com",
  databaseURL: "https://genuinely-29c37-default-rtdb.firebaseio.com",
  projectId: "genuinely-29c37",
  storageBucket: "genuinely-29c37.firebasestorage.app",
  messagingSenderId: "917781258806",
  appId: "1:917781258806:web:372e0b6e180953458fae97",
  measurementId: "G-XT5PZ1DH7R"
};

// Initialize Firebase
let database: Database | undefined;
try {
  const app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export { database };

