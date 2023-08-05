import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getStorage, ref } from "firebase/storage";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

let app;

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyByDPjYU0dhT1RdtXiqEhuuLJTlwXcpXc8",
  authDomain: "festival-messenger-4df40.firebaseapp.com",
  databaseURL: "https://festival-messenger-4df40-default-rtdb.firebaseio.com",
  projectId: "festival-messenger-4df40",
  storageBucket: "festival-messenger-4df40.appspot.com",
  messagingSenderId: "746813718960",
  appId: "1:746813718960:web:07732a2efb3a774ec85675",
  measurementId: "G-3S5YYNX2VY",
};

app = initializeApp(FIREBASE_CONFIG);

export const functions = getFunctions(app);
export const firestore = getFirestore();
export const storage = getStorage(app);

//Refs
export const chatsRef = collection(firestore, "chats");
export const usersRef = collection(firestore, "users");

export const userStorageRef = ref(storage, "users");
export const musicStorageRef = ref(storage, "music");
export const messageStorageRef = ref(storage, "messages");

export const auth = getAuth();

//"https://festival-messenger-4df40.web.app";
export const HOSTED_URL = "https://festival-messenger.com";
