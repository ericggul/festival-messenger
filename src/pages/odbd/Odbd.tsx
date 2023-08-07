import { Helmet } from "react-helmet";

import AglioEl from "@C/odbd";

export default function Aglio() {
  return (
    <>
      <Helmet>
        <title>운더보드</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="SNU Festival: 운더보드" />
      </Helmet>
      <AglioEl />
    </>
  );
}
