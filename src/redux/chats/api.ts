import { chatsRef } from "@/utils/initializer/firebase";
import { doc, getDoc, getDocs, setDoc, deleteDoc, query, where, addDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";

///////////////

export async function fetchChatsFromFirestore(chatId: any) {
  const docRef = doc(chatsRef, chatId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
}

export async function fetchChatsByMemberFromFirestore(member: any) {
  const q = query(chatsRef, where("members", "array-contains", member));
  let result: any[] = [];

  try {
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc: any) => {
      result.push({ chatId: doc.id, lastUpdatedAt: doc.data().lastUpdatedAt, members: doc.data().members });
    });
  } catch (e) {
    console.log(e);
  }

  return result;
}

//check if both two members exist
export async function fetchChatsByMembersFromFirestore(members: any) {
  const q = query(chatsRef, where("members", "==", members));
  const querySnapshot = await getDocs(q);

  let result: any[] = [];
  querySnapshot.forEach((doc: any) => {
    result.push(doc.id);
  });

  return result;
}

export async function deleteChatFromFirestore(chatId: any) {
  await deleteDoc(doc(chatsRef, chatId));
}
