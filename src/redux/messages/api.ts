import { chatsRef, messageStorageRef } from "@U/initalizer/firebase";
import { doc, collection, getDoc, getDocs, deleteDoc, query, addDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//Altering Chat Information(Add New Chat, Add Member)
export async function createNewChatFromFirestore(members: any) {
  const docRef = await addDoc(chatsRef, {
    members,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function addMemberToChatFromFirestore(chatId: any, members: any) {
  const docRef = doc(chatsRef, chatId);
  await updateDoc(docRef, {
    members,
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
    let data = doc.data();
    delete data["createdAt"];
    result.push(data);
  });

  return result;
}

export async function fetchMessageFromFirestore(chatId: any, messageId: any) {
  const parentChatRef = doc(chatsRef, chatId, "messages", messageId);
  const docSnap = await getDoc(parentChatRef);

  return docSnap.exists() ? docSnap.data() : null;
}

//Creating New Messages
export async function createNewMessageFromFirestore(props: any) {
  const parentChatRef = collection(chatsRef, props.chatId, "messages");
  const messageRef = await addDoc(parentChatRef, {
    createdAt: serverTimestamp(),
    messageText: props.messageText,
    messageFrom: props.messageFrom,
    messageTo: props.messageTo,
    latLngPos: props.latLngPos,
    read: false,
  });

  if (props.image) {
    const idRef = ref(messageStorageRef, `${messageRef.id}_profile.${props.image.type.split("/").pop()}`);
    await uploadBytesResumable(idRef, props.image, {
      contentType: props.image.type,
    });

    let imageUrl = await getDownloadURL(idRef);
    const parentChatRef = doc(chatsRef, props.chatId, "messages", messageRef.id);
    await updateDoc(parentChatRef, {
      imageUrl: imageUrl,
    });
    return { id: messageRef.id, imageUrl: imageUrl };
  }
  return messageRef.id;
}

//Altering Message Information
export async function alterMessageReadStateFromFirestore(chatId: any, messageId: any, newReadState: any) {
  const messageRef = doc(chatsRef, chatId, "messages", messageId);
  await updateDoc(messageRef, {
    read: newReadState,
  });
}

export async function alterMessageToFromFireStore(chatId: any, messageId: any, newMessageTo: any) {
  const messageRef = doc(chatsRef, chatId, "messages", messageId);
  await updateDoc(messageRef, {
    messageToId: newMessageTo.uid,
    messageToName: newMessageTo.name || "",
  });
}

//Deleting Message
export async function deleteMessageFromFirestore(chatId: any, messageId: any) {
  await deleteDoc(doc(chatsRef, chatId, "messages", messageId));
}