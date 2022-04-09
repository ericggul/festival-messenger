import React, { useMemo } from "react";
import Header from "@F/layout/Header";
import withMountEvent from "@U/hoc/withMountEvent";
import MessageConatiner from "@/containers/message/Message";
import { useParams } from "react-router-dom";

function Message() {
  const params = useParams();

  return (
    <>
      <Header name="Message" />
      <MessageConatiner chatId={params.chatId} messageId={params.messageId} />
    </>
  );
}

export default withMountEvent(Message);
