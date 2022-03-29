import { usersRef, userStorageRef } from "@U/initalizer/firebase";
import { doc, getDoc, getDocs, setDoc, deleteDoc, query, where, addDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

import TestImg from "@S/assets/test.png";

//Retrive User information
export async function fetchUserInformationFromFirestore(userId: any) {
  const docRef = doc(usersRef, userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}
//Create User information
export async function createUserInformationFromFirestore(user: any) {
  await setDoc(
    doc(usersRef, user.id),
    {
      email: user.email,
      name: user.name || "",
    },
    { merge: true }
  );

  const idRef = ref(userStorageRef, `${user.id}_profile.png`);
  await uploadBytes(idRef, TestImg, {
    contentType: "image/png",
  });
  console.log("hey");
}
//Alter User Information
export async function changeUserInformationFromFirestore(user: any) {
  const docRef = doc(usersRef, user.id);
  await updateDoc(docRef, {
    email: user.email,
    name: user.name || "",
  });
}

// //Update Profile Image
