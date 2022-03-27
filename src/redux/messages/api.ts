import { messagesRef } from "@U/initalizer/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function fetchMessagesFromFirestore(chat: any) {
  const docRef = doc(messagesRef, chat.id);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
}

export async function setMessagesInFirestore(chat: any, messageId: any, messages: any) {
  await setDoc(
    doc(messagesRef, chat.id),
    {
      messageId: messages,
    },
    { merge: true }
  );

  // miniGameCollectionRef.doc(user.uid).set({
  //     handwriting: handwritings,
  //   }, { merge: true }).then();
}
