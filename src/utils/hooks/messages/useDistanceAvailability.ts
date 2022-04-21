import { useState, useMemo, useEffect } from "react";

import getDistance from "@U/functions/distance";

export default function useDistanceAvailability(currPos: any, user: any, message: any) {
  const [messageAvaialble, setMessageAvailable] = useState(false);

  const distance = useMemo(() => (message && message.latLngPos ? getDistance(message.latLngPos, currPos) : 1000), [message, currPos]);

  useEffect(() => {
    //when distance fulfilled
    if (distance < 50) {
      setMessageAvailable(true);
    } //when message is already read
    else if (message && message.read) {
      setMessageAvailable(true);
    }
    //when message is accessed from user who had written it
    else if (user && message && user.uid === message.messageFrom) {
      setMessageAvailable(true);
    }
    //else return false
    else {
      setMessageAvailable(false);
    }
  }, [message, user, currPos]);

  return messageAvaialble;
}
