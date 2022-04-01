import React, { useMemo } from "react";
import Header from "@F/layout/Header";
import withMountEvent from "@U/hoc/withMountEvent";
import MessageConatiner from "@/containers/message/Message";

function Map(props: any) {
  const id = useMemo(() => (props.match.params ? parseInt(props.match.params.id) : 0), []);
  return (
    <>
      <Header name="Map" />
      <MessageConatiner id={id} />
    </>
  );
}

export default withMountEvent(Map);
