import { usersRef, userStorageRef } from "@U/initalizer/firebase";
import { doc, getDoc, getDocs, setDoc, deleteDoc, query, where, addDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";

import TestImg from "@S/assets/test.png";

//Retrive User information (Without Image)
export async function fetchUserInformationFromFirestore(userId: any) {
  const docRef = doc(usersRef, userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

//Editing is also allowd
export async function createUserInformationFromFirestore(user: any) {
  let imageUrl = user.kakaoProfileImageUrl;
  if (user.profileImage) {
    const userSpecificImageRef = ref(userStorageRef, user.id);
    let preceedingIndexes = 0;

    try {
      let lists = await listAll(userSpecificImageRef);
      lists.items.forEach((file) => {
        preceedingIndexes++;
      });
    } catch (error) {
      console.log(error);
    }

    const thisRef = ref(userSpecificImageRef, `${preceedingIndexes}.${user.profileImage.type.split("/").pop()}`);

    await uploadBytesResumable(thisRef, user.profileImage, {
      contentType: user.profileImage.type,
    });

    imageUrl = await getDownloadURL(thisRef);
  }

  await setDoc(
    doc(usersRef, user.id),
    {
      email: user.email,
      name: user.name || "",
      profileImage: imageUrl,
    },
    { merge: true }
  );

  return imageUrl;
}
