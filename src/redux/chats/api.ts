import { chatsRef } from "@U/initalizer/firebase";
import { doc, getDoc, getDocs, setDoc, deleteDoc, query, where, addDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";

export async function fetchChatsFromFirestore(chatId: any) {
  const docRef = doc(chatsRef, chatId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
}

export async function fetchChatsByMemberFromFirestore(member: any) {
  const q = query(chatsRef, where("members", "array-contains", member));
  const querySnapshot = await getDocs(q);

  let result: any[] = [];
  querySnapshot.forEach((doc: any) => {
    result.push(doc.id);
  });

  return result;
}

export async function createNewChatFromFirestore(members: any) {
  const docRef = await addDoc(chatsRef, {
    members,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function addMemberToChatFromFirestore(chatId: any, member: any) {
  const docRef = doc(chatsRef, chatId);
  await updateDoc(docRef, {
    members: arrayUnion(member),
  });
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().members : [];
}

export async function deleteChatFromFirestore(chatId: any) {
  await deleteDoc(doc(chatsRef, chatId));
}
