//redux

import { fetchChatsByMembers } from "@R/chats/middleware";
import { createNewChat, createNewMessage, updateChatLastUpdatedAt } from "@R/messages/middleware";

import { NO_PROFILE } from "@U/hooks/useAuth";

async function createNewChatAssigned(dispatch: any, user: any, toId: any) {
  const chatId = await dispatch(createNewChat([user.uid, toId]));
  return chatId;
}

async function createNewChatUnassigned(dispatch: any, user: any) {
  const chatId = await dispatch(createNewChat([user.uid]));
  return chatId;
}

export default async function handleSend(
  preview: any,
  imageFile: any,
  musicFile: any,
  dispatch: any,
  user: any,
  setLoading: any,

  setChatId: any,
  setMessageId: any,
  setMessageUUID: any,
  setProfileName: any,
  setProfileImg: any
) {
  setLoading(true);

  let toId = preview.toId;
  let uuid = preview.uuid;

  //For Testing
  //   toId = "test-new-user";

  //1. Check if props.id exist

  let chatId;
  let messageId;

  if (toId === "unassigned") {
    const res = await createNewChatUnassigned(dispatch, user);
    chatId = res.payload;
  } else {
    try {
      const res = await dispatch(fetchChatsByMembers([user.uid, toId]));
      if (res.payload.length === 0) {
        const res = await createNewChatAssigned(dispatch, user, toId);
        chatId = res.payload;
      } else {
        chatId = res.payload[0];
      }
    } catch (e) {
      alert(e);
      console.log("cannot retrive chat!", e);
    }
  }

  //2. Send Message
  try {
    const res = await dispatch(
      createNewMessage({
        chatId,
        messageFrom: user.uid,
        messageFromProfile: user.profileImage || NO_PROFILE,
        messageTo: toId,
        toName: preview.toName,
        mainText: preview.mainText.replaceAll("\n", "\\n"),
        latLngPos: preview.latLngPos,
        color: preview.color,
        font: preview.font,
        image: imageFile,
        music: musicFile,
      })
    );
    messageId = res.payload.id;
  } catch (e) {
    alert(e);
    console.log("cannot create chat!", e);
  }

  //3. Update Chat serverTimestamp
  try {
    await dispatch(updateChatLastUpdatedAt(chatId));
  } catch (e) {
    console.log(e);
  }

  setChatId(chatId);
  setMessageId(messageId);
  setMessageUUID(uuid);

  setProfileImg(user.profileImage || NO_PROFILE);
  setProfileName(user.name || "NO NAME");

  alert("메시지 전송 완료!");
  setLoading(false);
}
