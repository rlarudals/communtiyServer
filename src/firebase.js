import firebase from "firebase";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyAQaiZes5kWW8Dt8eeOtenvlqzTdBulBFg",
  authDomain: "community2020-96eb1.firebaseapp.com",
  databaseURL: "https://community2020-96eb1.firebaseio.com",
  projectId: "community2020-96eb1",
  storageBucket: "community2020-96eb1.appspot.com",
  messagingSenderId: "1009282012731",
  appId: "1:1009282012731:web:8347fbb818264930c7ee1e",
  measurementId: "G-5RCFJGLZBR",
};

firebase.initializeApp(firebaseConfig);

const firestore = new firebase.firestore();

export default firestore;
