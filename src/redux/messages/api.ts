import { chatsRef, messageStorageRef, HOSTED_URL } from "@/utils/initializer/firebase";
import { doc, collection, getDoc, getDocs, deleteDoc, query, addDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//Altering Chat Information(Add New Chat, Add Member)
export async function createNewChatFromFirestore(members: any) {
  const docRef = await addDoc(chatsRef, {
    members,
    createdAt: serverTimestamp(),
    lastUpdatedAt: serverTimestamp(),
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

export async function updateChatLastUpdatedAtFromFirestore(chatId: any) {
  const docRef = doc(chatsRef, chatId);
  await updateDoc(docRef, {
    lastUpdatedAt: serverTimestamp(),
  });
}

///Fetching Messages

export async function fetchAllMessagesFromFirestore(chatId: any) {
  const parentChatRef = collection(chatsRef, chatId, "messages");

  const q = query(parentChatRef);
  const querySnapShot = await getDocs(q);

  let result: any[] = [];
  querySnapShot.forEach((doc: any) => {
    let data = doc.data();
    result.push({ ...data, messageId: doc.id });
  });

  return result;
}

export async function fetchMessageFromFirestore(chatId: any, messageId: any) {
  const parentChatRef = doc(chatsRef, chatId, "messages", messageId);
  const docSnap = await getDoc(parentChatRef);

  return docSnap.exists() ? docSnap.data() : null;
}

//messageId: String; messageFrom: String; messageTo: String; toName: String; mainText: String; latLngPos: any; read: any; color: any; font: any; imageUrl?: any; musicUrl?: any
//Creating New Messages
export async function createNewMessageFromFirestore(props: any) {
  const parentChatRef = collection(chatsRef, props.chatId, "messages");
  const messageRef = await addDoc(parentChatRef, {
    createdAt: serverTimestamp(),
    messageFrom: props.messageFrom,
    messageFromProfile: props.messageFromProfile,
    messageTo: props.messageTo,
    toName: props.toName,
    mainText: props.mainText,
    latLngPos: props.latLngPos,
    color: props.color,
    font: props.font,
    read: false,
  });

  let imageUrl = "";
  let musicUrl = "";
  if (props.image) {
    const idRef = ref(messageStorageRef, `${messageRef.id}_image.${props.image.type.split("/").pop()}`);
    await uploadBytesResumable(idRef, props.image, {
      contentType: props.image.type,
    });

    imageUrl = await getDownloadURL(idRef);
    const parentChatRef = doc(chatsRef, props.chatId, "messages", messageRef.id);
    await updateDoc(parentChatRef, {
      imageUrl: imageUrl,
    });
  }

  if (props.music) {
    //Exception when props.music is just idx
    if (typeof props.music === "number") {
      musicUrl = `${HOSTED_URL}/assets/audio/${props.music}.mp3`;
    } else {
      const idRef = ref(messageStorageRef, `${messageRef.id}_music.mp3`);
      await uploadBytesResumable(idRef, props.music, {
        contentType: "audio/mpeg",
      });

      musicUrl = await getDownloadURL(idRef);
    }

    const parentChatRef = doc(chatsRef, props.chatId, "messages", messageRef.id);
    await updateDoc(parentChatRef, {
      musicUrl: musicUrl,
    });
  }
  return { id: messageRef.id, imageUrl, musicUrl };
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
    messageTo: newMessageTo,
  });
}

//Deleting Message
export async function deleteMessageFromFirestore(chatId: any, messageId: any) {
  await deleteDoc(doc(chatsRef, chatId, "messages", messageId));
}
