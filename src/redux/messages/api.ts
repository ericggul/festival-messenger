import { chatsRef, firestore } from "@U/initalizer/firebase";
import { doc, collection, getDoc, getDocs, deleteDoc, query, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

export async function fetchAllMessagesFromFirestore(chatId: any) {
  const parentChatRef = collection(chatsRef, chatId, "messages");
  const q = query(parentChatRef);
  const querySnapShot = await getDocs(q);

  let result: any[] = [];
  querySnapShot.forEach((doc: any) => {
    result.push(doc.id);
  });

  return result;
}

export async function fetchMessageFromFirestore(chatId: any, messageId: any) {
  const parentChatRef = doc(chatsRef, chatId, "messages", messageId);
  const docSnap = await getDoc(parentChatRef);

  return docSnap.exists() ? docSnap.data() : null;
}

export async function createNewMessageFromFirestore(chatId: any, messageText: any, messageFrom: any, messageTo: any) {
  const parentChatRef = collection(chatsRef, chatId, "messages");
  const messageRef = await addDoc(parentChatRef, {
    createdAt: serverTimestamp(),
    messageText,
    messageFrom,
    messageTo,
  });
  return messageRef.id;
}

export async function deleteMessageFromFirestore(chatId: any, messageId: any) {
  await deleteDoc(doc(chatsRef, chatId, "messages", messageId));
}
