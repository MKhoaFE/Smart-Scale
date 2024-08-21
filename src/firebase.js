import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDz2UK6qDfA6_tycT_cJPYZqVUccc01U6U",
    authDomain: "vlccntt.firebaseapp.com",
    databaseURL: "https://vlccntt-default-rtdb.firebaseio.com",
    projectId: "vlccntt",
    storageBucket: "vlccntt.appspot.com",
    messagingSenderId: "613058953545",
    appId: "1:613058953545:web:072c21dfc1dc129dcfda98",
    measurementId: "G-PH587KHQQT"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set };