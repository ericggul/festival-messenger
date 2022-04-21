//images
import ARROW_LEFT from "@I/icons/messenger/arrow-left.svg";
import ARROW_RIGHT from "@I/icons/messenger/arrow-right.svg";

export default function createMessageMarker(chat: any, msg: any, user: any, handleMessageClick: any) {
  let el = document.createElement("div");
  el.className = "marker";

  if (msg.messageFromProfile) {
    let img = document.createElement("img");
    img.src = msg.messageFromProfile;
    el.appendChild(img);
  } else {
    el.className += "no-img";
  }

  //signifier
  let signifier = document.createElement("div");
  let signifierImg = document.createElement("img");
  if (msg.messageFrom === user.uid) {
    signifier.className = "signifier sent";
    signifierImg.src = ARROW_RIGHT;
  } else {
    signifier.className = "signifier recieved";
    signifierImg.src = ARROW_LEFT;
  }
  signifier.appendChild(signifierImg);
  el.appendChild(signifier);

  el.addEventListener("click", (ev: any) => {
    handleMessageClick(chat.chatId, msg.messageId);
    ev.stopPropagation();
  });

  return el;
}
