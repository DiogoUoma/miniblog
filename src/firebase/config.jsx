import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGxWnhRaCbAFEhJhmYj5gyPnS5uysAB2c",
  authDomain: "miniblog-9e84c.firebaseapp.com",
  projectId: "miniblog-9e84c",
  storageBucket: "miniblog-9e84c.appspot.com",
  messagingSenderId: "243263198679",
  appId: "1:243263198679:web:70e7fec875359a5d8c2792",
  measurementId: "G-KWDMWP11KV",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
