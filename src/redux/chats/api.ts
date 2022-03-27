import { chatsRef } from "@U/initalizer/firebase";
import { doc, getDoc, getDocs, setDoc, query, where, addDoc } from "firebase/firestore";

export async function fetchChatsFromFirestore(chat: any) {
  const docRef = doc(chatsRef, chat.id);
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

export async function createNewChat(members: any) {
  const docRef = await addDoc(chatsRef, {
    members,
  });
  return docRef.id;
}
