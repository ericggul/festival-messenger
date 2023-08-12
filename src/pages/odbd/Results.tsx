import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Results from "@C/odbd/Results";

export default function Page() {
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>운더보드</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="SNU Festival: 운더보드" />
      </Helmet>
      <Results selection={params.type?.split("-")} />
    </>
  );
}
