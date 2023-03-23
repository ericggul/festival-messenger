import React, { useEffect, useMemo, useState, useRef } from "react";
import * as S from "./styles";

import { DATA } from "./data";
import { useNavigate } from "react-router-dom";

//icons
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";

//images
import Loading from "@I/aglio/loading.png";
import ResultImg from "@I/aglio/result.png";
import Chukasa from "@I/aglio/chukasa.png";

import { KAKAO_AGLIO_ID } from "@/configs/kakao";

//Toast
import toast from "react-hot-toast";

import html2canvas from "html2canvas";

export default function Aglio({ type }: any) {
  const [data, setData] = useState(DATA[0]);

  useEffect(() => {
    setData(DATA.filter((datum: any) => datum.type === type)[0] || DATA[0]);
  }, [type]);

  const navigate = useNavigate();

  function matchDirect(text: any) {
    const type = DATA.filter((datum: any) => datum.name === text)[0].type;
    navigate(`/aglio/results/${type}`);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);

  async function storyShare() {
    try {
      //scroll to top
      if (!contentsRef.current) return;
      contentsRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      await new Promise((resolve) => setTimeout(resolve, 800));
      alert("스토리에 공유할 이미지를 저장합니다.");

      toast("이미지 저장 중...");
      if (!containerRef.current) return;
      const canvas = await html2canvas(containerRef.current);
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `알리오.png`;
      document.body.appendChild(link);
      link.href = dataURL;
      link.click();
      document.body.removeChild(link);

      await new Promise((resolve) => setTimeout(resolve, 1700));
      alert("이미지를 저장했습니다. 인스타그램으로 이동합니다.");

      window.location.href = "https://www.instagram.com/snufestival";
    } catch (e) {
      console.log(e);
    }
  }

  async function linkShare() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    alert("링크 복사 완료! " + url);
  }

  function kakaoShare() {
    window.Kakao.Link.sendCustom({
      templateId: KAKAO_AGLIO_ID,
      templateArgs: {
        imageUrl: `https://snufestival.com/assets/images/aglio/16-types/${data.type}.png`,
      },
    });
  }

  return (
    <S.Container ref={containerRef}>
      <S.Inner>
        <S.Contents ref={contentsRef}>
          <S.NameContainer>
            <S.PreName>{data.preName}</S.PreName>
            <S.Name>
              나는 <span>{`'${data.name}'`}</span>
            </S.Name>
          </S.NameContainer>
          <S.ImageContainer>
            <img src={process.env.PUBLIC_URL + "/assets/images/aglio/16-types/" + data.type + ".png"} />
          </S.ImageContainer>
          <S.Description>
            {data.description.split("\n").map((text: any, i) => (
              <p key={i}>{text}</p>
            ))}
          </S.Description>
          <S.MatchContainer>
            <S.Match onClick={() => matchDirect(data.match[0])}>
              <S.MatchUpper>{"나와 잘 맞는 리오는? :)"}</S.MatchUpper>
              <S.MatchLower>{`'${data.match[0]}'`}</S.MatchLower>
            </S.Match>

            <S.Match onClick={() => matchDirect(data.match[1])}>
              <S.MatchUpper>{"나와 안 맞는 리오는? :("}</S.MatchUpper>
              <S.MatchLower>{`'${data.match[1]}'`}</S.MatchLower>
            </S.Match>
          </S.MatchContainer>
          {/* ////// */}
          <S.ChukasaContainer>
            <img src={Chukasa} />
          </S.ChukasaContainer>
          <S.ChukasaExpl>
            <h1>서울대학교 2023 봄축제</h1>
            <h1>SNU FESTIVAL: 리오, 더 오리</h1>
            <h1>5.9 ~ 5.11</h1>
            <h2>Instagram @snufestival</h2>
          </S.ChukasaExpl>

          <S.ShareContainer>
            <S.SingleShare onClick={storyShare}>
              <S.Text>스토리에 공유하리오</S.Text>
              <S.Image>
                <FaInstagram />
              </S.Image>
            </S.SingleShare>
            <S.SingleShare onClick={linkShare}>
              <S.Text>링크 복사하리오</S.Text>
              <S.Image>
                <AiOutlineLink />
              </S.Image>
            </S.SingleShare>
            <S.SingleShare onClick={kakaoShare}>
              <S.Text>카톡으로 공유하리오</S.Text>
              <S.Image>
                <RiKakaoTalkFill />
              </S.Image>
            </S.SingleShare>
          </S.ShareContainer>

          <S.ResultContainer>
            <img src={ResultImg} />
          </S.ResultContainer>

          <S.EventExpl>
            <h3>4.2 ~ 4.9 사이에</h3>
            <h3>검사 결과를 인스타 스토리에 공유하고,</h3>
            <h3>축하사 계정을 팔로우한 후 태그하면</h3>
            <h2>추첨을 통해 상품 증정!</h2>
          </S.EventExpl>
        </S.Contents>
      </S.Inner>
    </S.Container>
  );
}
