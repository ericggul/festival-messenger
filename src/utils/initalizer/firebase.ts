import { FIREBASE_CONFIG } from "../../firebase/config";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

let app;
app = initializeApp(FIREBASE_CONFIG);

export const functions = getFunctions(app);
export const firestore = getFirestore();
export const storage = getStorage(app);

//Refs
export const chatsRef = collection(firestore, "chats");

export const auth = getAuth();
