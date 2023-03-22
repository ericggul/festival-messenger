import { Helmet } from "react-helmet";

import AglioEl from "@C/aglio/Aglio";

export default function Aglio() {
  return (
    <>
      <Helmet>
        <title>알리오 올리오</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="SNU Festival" />
      </Helmet>
      <AglioEl />
    </>
  );
}