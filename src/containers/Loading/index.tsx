import React, { Suspense, useMemo } from "react";
import * as S from "./styles";

//foundations
import Loading1 from "@F/loading/hundreadLoadings/Loading1";
import Loading2 from "@F/loading/hundreadLoadings/Loading2";
import Loading3 from "@F/loading/hundreadLoadings/Loading3";
import Loading4 from "@F/loading/hundreadLoadings/Loading4";
import Loading5 from "@F/loading/hundreadLoadings/Loading5";
import Loading6 from "@F/loading/hundreadLoadings/Loading6";
import Loading7 from "@F/loading/hundreadLoadings/Loading7";
import Loading8 from "@F/loading/hundreadLoadings/Loading8";
import Loading9 from "@F/loading/hundreadLoadings/Loading9";
import Loading10 from "@F/loading/hundreadLoadings/Loading10";
import Loading11 from "@F/loading/hundreadLoadings/Loading11";
import Loading12 from "@F/loading/hundreadLoadings/Loading12";
import Loading13 from "@F/loading/hundreadLoadings/Loading13";
import Loading14 from "@F/loading/hundreadLoadings/Loading14";
import Loading15 from "@F/loading/hundreadLoadings/Loading15";
import Loading16 from "@F/loading/hundreadLoadings/Loading16";
import Loading17 from "@F/loading/hundreadLoadings/Loading17";
import Loading18 from "@F/loading/hundreadLoadings/Loading18";
import Loading19 from "@F/loading/hundreadLoadings/Loading19";
import Loading20 from "@F/loading/hundreadLoadings/Loading20";
import Loading21 from "@F/loading/hundreadLoadings/Loading21";
import Loading22 from "@F/loading/hundreadLoadings/Loading22";
import Loading23 from "@F/loading/hundreadLoadings/Loading23";
import Loading24 from "@F/loading/hundreadLoadings/Loading24";
import Loading25 from "@F/loading/hundreadLoadings/Loading25";
import Loading26 from "@F/loading/hundreadLoadings/Loading26";
import Loading27 from "@F/loading/hundreadLoadings/Loading27";
import Loading28 from "@F/loading/hundreadLoadings/Loading28";
import Loading29 from "@F/loading/hundreadLoadings/Loading29";
import Loading30 from "@F/loading/hundreadLoadings/Loading30";
import Loading31 from "@F/loading/hundreadLoadings/Loading31";
import Loading32 from "@F/loading/hundreadLoadings/Loading32";
import Loading33 from "@F/loading/hundreadLoadings/Loading33";
import Loading34 from "@F/loading/hundreadLoadings/Loading34";
import Loading35 from "@F/loading/hundreadLoadings/Loading35";
import Loading36 from "@F/loading/hundreadLoadings/Loading36";
import Loading37 from "@F/loading/hundreadLoadings/Loading37";
import Loading38 from "@F/loading/hundreadLoadings/Loading38";
import Loading39 from "@F/loading/hundreadLoadings/Loading39";
import Loading40 from "@F/loading/hundreadLoadings/Loading40";
import Loading41 from "@F/loading/hundreadLoadings/Loading41";
import Loading42 from "@F/loading/hundreadLoadings/Loading42";
import Loading43 from "@F/loading/hundreadLoadings/Loading43";
import Loading44 from "@F/loading/hundreadLoadings/Loading44";
import Loading45 from "@F/loading/hundreadLoadings/Loading45";
import Loading46 from "@F/loading/hundreadLoadings/Loading46";
import Loading47 from "@F/loading/hundreadLoadings/Loading47";
import Loading48 from "@F/loading/hundreadLoadings/Loading48";
import Loading49 from "@F/loading/hundreadLoadings/Loading49";
import Loading50 from "@F/loading/hundreadLoadings/Loading50";
import Loading51 from "@F/loading/hundreadLoadings/Loading51";
import Loading52 from "@F/loading/hundreadLoadings/Loading52";
import Loading53 from "@F/loading/hundreadLoadings/Loading53";
import Loading54 from "@F/loading/hundreadLoadings/Loading54";
import Loading55 from "@F/loading/hundreadLoadings/Loading55";
import Loading56 from "@F/loading/hundreadLoadings/Loading56";
import Loading57 from "@F/loading/hundreadLoadings/Loading57";
import Loading58 from "@F/loading/hundreadLoadings/Loading58";
import Loading59 from "@F/loading/hundreadLoadings/Loading59";
import Loading60 from "@F/loading/hundreadLoadings/Loading60";
import Loading61 from "@F/loading/hundreadLoadings/Loading61";
import Loading62 from "@F/loading/hundreadLoadings/Loading62";
import Loading63 from "@F/loading/hundreadLoadings/Loading63";
import Loading64 from "@F/loading/hundreadLoadings/Loading64";
import Loading65 from "@F/loading/hundreadLoadings/Loading65";
import Loading66 from "@F/loading/hundreadLoadings/Loading66";
import Loading67 from "@F/loading/hundreadLoadings/Loading67";
import Loading68 from "@F/loading/hundreadLoadings/Loading68";
import Loading69 from "@F/loading/hundreadLoadings/Loading69";
import Loading70 from "@F/loading/hundreadLoadings/Loading70";
import Loading71 from "@F/loading/hundreadLoadings/Loading71";
import Loading72 from "@F/loading/hundreadLoadings/Loading72";
import Loading73 from "@F/loading/hundreadLoadings/Loading73";
import Loading74 from "@F/loading/hundreadLoadings/Loading74";
import Loading75 from "@F/loading/hundreadLoadings/Loading75";
import Loading76 from "@F/loading/hundreadLoadings/Loading76";
import Loading77 from "@F/loading/hundreadLoadings/Loading77";
import Loading78 from "@F/loading/hundreadLoadings/Loading78";
import Loading79 from "@F/loading/hundreadLoadings/Loading79";
import Loading80 from "@F/loading/hundreadLoadings/Loading80";
import Loading81 from "@F/loading/hundreadLoadings/Loading81";
import Loading82 from "@F/loading/hundreadLoadings/Loading82";
import Loading83 from "@F/loading/hundreadLoadings/Loading83";
import Loading84 from "@F/loading/hundreadLoadings/Loading84";
import Loading85 from "@F/loading/hundreadLoadings/Loading85";
import Loading86 from "@F/loading/hundreadLoadings/Loading86";
import Loading87 from "@F/loading/hundreadLoadings/Loading87";
import Loading88 from "@F/loading/hundreadLoadings/Loading88";
import Loading89 from "@F/loading/hundreadLoadings/Loading89";
import Loading90 from "@F/loading/hundreadLoadings/Loading90";
import Loading91 from "@F/loading/hundreadLoadings/Loading91";
import Loading92 from "@F/loading/hundreadLoadings/Loading92";
import Loading93 from "@F/loading/hundreadLoadings/Loading93";
import Loading94 from "@F/loading/hundreadLoadings/Loading94";
import Loading95 from "@F/loading/hundreadLoadings/Loading95";
import Loading96 from "@F/loading/hundreadLoadings/Loading96";
import Loading97 from "@F/loading/hundreadLoadings/Loading97";
import Loading98 from "@F/loading/hundreadLoadings/Loading98";
import Loading99 from "@F/loading/hundreadLoadings/Loading99";
import Loading100 from "@F/loading/hundreadLoadings/Loading100";

function Loading() {
  const randomNumber = useMemo(() => Math.floor(Math.random() * 100), []);

  const RandomRender = ({ number }: any) => {
    switch (number) {
      case 0:
        return <Loading1 />;
      case 1:
        return <Loading2 />;
      case 2:
        return <Loading3 />;
      case 3:
        return <Loading4 />;
      case 4:
        return <Loading5 />;
      case 5:
        return <Loading6 />;
      case 6:
        return <Loading7 />;
      case 7:
        return <Loading8 />;
      case 8:
        return <Loading9 />;
      case 9:
        return <Loading10 />;
      case 10:
        return <Loading11 />;
      case 11:
        return <Loading12 />;
      case 12:
        return <Loading13 />;

      case 13:
        return <Loading14 />;
      case 14:
        return <Loading15 />;
      case 15:
        return <Loading16 />;
      case 16:
        return <Loading17 />;
      case 17:
        return <Loading18 />;

      case 18:
        return <Loading19 />;
      case 19:
        return <Loading20 />;
      case 20:
        return <Loading21 />;

      case 21:
        return <Loading22 />;
      case 22:
        return <Loading23 />;
      case 23:
        return <Loading24 />;
      case 24:
        return <Loading25 />;
      case 25:
        return <Loading26 />;
      case 26:
        return <Loading27 />;
      case 27:
        return <Loading28 />;
      case 28:
        return <Loading29 />;
      case 29:
        return <Loading30 />;
      case 30:
        return <Loading31 />;
      case 31:
        return <Loading32 />;
      case 32:
        return <Loading33 />;
      case 33:
        return <Loading34 />;
      case 34:
        return <Loading35 />;
      case 35:
        return <Loading36 />;
      case 36:
        return <Loading37 />;
      case 37:
        return <Loading38 />;
      case 38:
        return <Loading39 />;
      case 39:
        return <Loading40 />;
      case 40:
        return <Loading41 />;
      case 41:
        return <Loading42 />;
      case 42:
        return <Loading43 />;

      case 43:
        return <Loading44 />;
      case 44:
        return <Loading45 />;
      case 45:
        return <Loading46 />;
      case 46:
        return <Loading47 />;
      case 47:
        return <Loading48 />;
      case 48:
        return <Loading49 />;
      case 49:
        return <Loading50 />;
      case 50:
        return <Loading51 />;
      case 51:
        return <Loading52 />;
      case 52:
        return <Loading53 />;
      case 53:
        return <Loading54 />;
      case 54:
        return <Loading55 />;
      case 55:
        return <Loading56 />;
      case 56:
        return <Loading57 />;
      case 57:
        return <Loading58 />;
      case 58:
        return <Loading59 />;
      case 59:
        return <Loading60 />;
      case 60:
        return <Loading61 />;
      case 61:
        return <Loading62 />;
      case 62:
        return <Loading63 />;
      case 63:
        return <Loading64 />;
      case 64:
        return <Loading65 />;
      case 65:
        return <Loading66 />;
      case 66:
        return <Loading67 />;
      case 67:
        return <Loading68 />;
      case 68:
        return <Loading69 />;
      case 69:
        return <Loading70 />;
      case 70:
        return <Loading71 />;
      case 71:
        return <Loading72 />;
      case 72:
        return <Loading73 />;
      case 73:
        return <Loading74 />;
      case 74:
        return <Loading75 />;
      case 75:
        return <Loading76 />;
      case 76:
        return <Loading77 />;
      case 77:
        return <Loading78 />;
      case 78:
        return <Loading79 />;
      case 79:
        return <Loading80 />;
      case 80:
        return <Loading81 />;
      case 81:
        return <Loading82 />;
      case 82:
        return <Loading83 />;
      case 83:
        return <Loading84 />;
      case 84:
        return <Loading85 />;
      case 85:
        return <Loading86 />;
      case 86:
        return <Loading87 />;
      case 87:
        return <Loading88 />;
      case 88:
        return <Loading89 />;
      case 89:
        return <Loading90 />;

      case 90:
        return <Loading91 />;
      case 91:
        return <Loading92 />;
      case 92:
        return <Loading93 />;
      case 93:
        return <Loading94 />;
      case 94:
        return <Loading95 />;
      case 95:
        return <Loading96 />;
      case 96:
        return <Loading97 />;
      case 97:
        return <Loading98 />;
      case 98:
        return <Loading99 />;
      case 99:
        return <Loading100 />;

      default:
        return <Loading100 />;
    }
  };

  return (
    <S.Container>
      <Suspense fallback={<></>}>
        <RandomRender number={randomNumber} />
      </Suspense>
    </S.Container>
  );
}
export default Loading;
