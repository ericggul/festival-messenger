import React, { useState } from "react";

export default function useInput(initialValue: any, constraint?: any) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: any) => {
    if (constraint && !constraint(e.target.value)) return;
    setValue(e.target.value);
  };

  return { value, onChange, setValue };
}
