import { chatsRef, messageStorageRef } from "@U/initalizer/firebase";
import { doc, collection, getDoc, getDocs, deleteDoc, query, addDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";

//Altering Chat Information(Add New Chat, Add Member)
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

///Fetching Messages

export async function fetchAllMessagesFromFirestore(chatId: any) {
  const parentChatRef = collection(chatsRef, chatId, "messages");
  const q = query(parentChatRef);
  const querySnapShot = await getDocs(q);

  let result: any[] = [];
  querySnapShot.forEach((doc: any) => {
    console.log(doc);
    result.push(doc.id);
  });

  return result;
}

export async function fetchMessageFromFirestore(chatId: any, messageId: any) {
  const parentChatRef = doc(chatsRef, chatId, "messages", messageId);
  const docSnap = await getDoc(parentChatRef);

  return docSnap.exists() ? docSnap.data() : null;
}

//Creating New Messages
export async function createNewMessageFromFirestore(chatId: any, messageText: any, messageFrom: any, messageTo: any, latLngPos: any) {
  const parentChatRef = collection(chatsRef, chatId, "messages");
  const messageRef = await addDoc(parentChatRef, {
    createdAt: serverTimestamp(),
    messageText,
    messageFromId: messageFrom.uid,
    messageFromName: messageFrom.name || "",
    messageToId: messageTo.uid,
    messageToName: messageTo.name || "",
    latLngPos: latLngPos,
    read: false,
  });
  return messageRef.id;
}

//Altering Message Information
export async function alterMessageReadStateFromFirestore(chatId: any, messageId: any, newReadState: any) {
  const parentChatRef = doc(chatsRef, chatId, "messages", messageId);
  await updateDoc(parentChatRef, {
    read: newReadState,
  });
}

export async function alterMessageToFromFireStore(chatId: any, messageId: any, newMessageTo: any) {
  const parentChatRef = doc(chatsRef, chatId, "messages", messageId);
  await updateDoc(parentChatRef, {
    messageToId: newMessageTo.uid,
    messageToName: newMessageTo.name || "",
  });
}

//Deleting Message
export async function deleteMessageFromFirestore(chatId: any, messageId: any) {
  await deleteDoc(doc(chatsRef, chatId, "messages", messageId));
}
