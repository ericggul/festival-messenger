import React, { useMemo } from "react";
import Header from "@F/layout/Header";
import withMountEvent from "@U/hoc/withMountEvent";
import MessageConatiner from "@C/message/Message";
import { useParams } from "react-router-dom";

//helmet
import { Helmet } from "react-helmet";

function Message() {
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>Message</title>
      </Helmet>
      <MessageConatiner chatId={params.chatId} messageId={params.messageId} navigationComingFrom={params.navigationComingFrom && params.navigationComingFrom} />
    </>
  );
}

export default withMountEvent(Message);
