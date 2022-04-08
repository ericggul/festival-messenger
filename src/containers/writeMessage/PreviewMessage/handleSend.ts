//redux
import { useAppDispatch, useAppSelector } from "@R/common/hooks";
import { actions } from "@R/singleMessage/messagePreview/state";
import { actions as userActions } from "@R/users/state";

import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";
import { fetchChatsByMembers } from "@R/chats/middleware";
import { createNewChat, createNewMessage } from "@R/messages/middleware";

async function createNewChatAssigned(dispatch: any, user: any, toId: any) {
  const chatId = await dispatch(createNewChat([user.uid, toId]));
  return chatId;
}

async function createNewChatUnassigned(dispatch: any, user: any) {
  const chatId = await dispatch(createNewChat([user.uid]));
  return chatId;
}

export default async function handleSend(preview: any, imageFile: any, musicFile: any, dispatch: any, user: any, setLoading: any) {
  setLoading(true);

  let toId = preview.toId;

  //For Testing
  //   toId = "test-new-user";

  //1. Check if props.id exist

  let chatId;

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
      console.log("cannot retrive chat!", e);
    }
  }

  //2. Send Message
  try {
    const res = await dispatch(
      createNewMessage({
        chatId,
        messageFrom: user.uid,
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
    console.log(res);
  } catch (e) {
    console.log("cannot create chat!", e);
  }
  setLoading(false);
}
