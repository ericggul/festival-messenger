import React, { useEffect } from "react";

function withMountEvent(InputComponent: any) {
  return function ResultComponent(props: any) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return <InputComponent {...props} />;
  };
}
export default withMountEvent;
