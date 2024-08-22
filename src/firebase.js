import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCrhf2KnCVLxuvlErgnGDjf_CSjPONnYQg",
  authDomain: "vlccntt-final-project.firebaseapp.com",
  databaseURL:
    "https://vlccntt-final-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vlccntt-final-project",
  storageBucket: "vlccntt-final-project.appspot.com",
  messagingSenderId: "1055995682577",
  appId: "1:1055995682577:web:9a70146f926c1ad17276b0",
  measurementId: "G-VJSQXQ2E1L",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set };
