//convert time for displayment purpose
export function timeConverter(time: any) {
  function intConverter(int: any) {
    if (int < 10) {
      return `0${int}`;
    }
    return int.toString();
  }
  const hour = time.toDate().getHours();
  const minute = time.toDate().getMinutes();

  return `${intConverter(hour)}:${intConverter(minute)}`;
}

//get delta time of message
export function deltaTime(time: any) {
  const delta = (Date.now() / 1000 - time.seconds) / (60 * 60);
  return delta;
}

export const SEVENTY_TWO_HOURS = 3 * 24;
