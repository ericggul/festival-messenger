import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ImageGenerator from "@C/odbd/ImageGenerator";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>운더보드</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="SNU Festival: 운더보드" />
      </Helmet>
      <ImageGenerator />
    </>
  );
}
