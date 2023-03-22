import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";

import { DATA } from "./data";

//icons
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";

//images
import Loading from "@I/aglio/loading.png";
import Result from "@I/aglio/result.png";
import Chukasa from "@I/aglio/chukasa.png";

export default function Aglio() {
  const [type, setType] = useState("");
  const [data, setData] = useState(DATA[0]);

  return (
    <S.Container>
      <S.Inner>
        <S.Contents>
          <S.NameContainer>
            <S.PreName>{data.preName}</S.PreName>
            <S.Name>
              나는 <span>{`'${data.name}'`}</span>
            </S.Name>
          </S.NameContainer>
          <S.ImageContainer>
            <img src={"./assets/images/aglio/16-types/" + data.type + ".png"} />
          </S.ImageContainer>
          <S.Description>
            {data.description.split("\n").map((text: any, i) => (
              <p key={i}>{text}</p>
            ))}
          </S.Description>
          <S.MatchContainer>
            <S.Match>
              <S.MatchUpper>{"나와 잘 맞는 리오는? :)"}</S.MatchUpper>
              <S.MatchLower>{`'${data.match[0]}'`}</S.MatchLower>
            </S.Match>

            <S.Match>
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
            <S.SingleShare>
              <S.Text>스토리에 공유하리오</S.Text>
              <S.Image>
                <FaInstagram />
              </S.Image>
            </S.SingleShare>
            <S.SingleShare>
              <S.Text>링크 복사하리오</S.Text>
              <S.Image>
                <AiOutlineLink />
              </S.Image>
            </S.SingleShare>
            <S.SingleShare>
              <S.Text>카톡으로 공유하리오</S.Text>
              <S.Image>
                <RiKakaoTalkFill />
              </S.Image>
            </S.SingleShare>
          </S.ShareContainer>

          <S.ResultContainer>
            <img src={Result} />
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
