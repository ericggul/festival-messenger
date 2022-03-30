import { usersRef, userStorageRef } from "@U/initalizer/firebase";
import { doc, getDoc, getDocs, setDoc, deleteDoc, query, where, addDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

import TestImg from "@S/assets/test.png";

//Retrive User information
export async function fetchUserInformationFromFirestore(userId: any) {
  const docRef = doc(usersRef, userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}
//Create User information
//Editing is also allowd
export async function createUserInformationFromFirestore(user: any) {
  await setDoc(
    doc(usersRef, user.id),
    {
      email: user.email,
      name: user.name || "",
    },
    { merge: true }
  );

  const idRef = ref(userStorageRef, `${user.id}_profile.${user.profileImage.type.split("/").pop()}`);
  await uploadBytesResumable(idRef, user.profileImage, {
    contentType: user.profileImage.type,
  });
}

// //Update Profile Image
