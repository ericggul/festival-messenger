import React, { useEffect, useState, useRef, useMemo } from "react";

import * as S from "./styles";

import preloadImage from "@U/functions/preload";
import useResize from "@U/hooks/useResize";
//icons
import Cancel from "@I/icons/modal/cancel.svg";

import { FaInstagram } from "react-icons/fa";

//images
import News1 from "@I/cardnews/news1.png";
import News2 from "@I/cardnews/news2.png";
import News3 from "@I/cardnews/news3.png";
import News4 from "@I/cardnews/news4.png";
import News5 from "@I/cardnews/news5.png";
const IMG_ARRAY = [News1, News2, News3, News4, News5];
const ImageDiv = ({ currentImg }: any) => {
  return (
    <>
      <S.HiddenImg src={News2} />
      {IMG_ARRAY.map((img, idx) => idx === currentImg && <S.Image src={img} key={idx} />)}
    </>
  );
};

function ViewTimeTableModal({ setIsModalOpen }: any) {
  const [currentImg, setCurrentImg] = useState(1);
  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {
    IMG_ARRAY.forEach((img) => preloadImage(img));
  }, []);

  return (
    <>
      <S.Background />

      <S.Box>
        <S.CloseButton onClick={() => setIsModalOpen(false)}>
          <S.CloseIcon src={Cancel} />
        </S.CloseButton>

        <S.Contents>
          <S.Header>
            <h1>SNU Festival: 홈커밍</h1>
            <h2>Timetable</h2>
          </S.Header>
          <S.Carousel>
            <S.Arrow onClick={() => setCurrentImg((idx) => (idx === 0 ? 4 : (idx - 1) % 5))}>{"<"}</S.Arrow>
            <S.ImageContainer>
              <ImageDiv currentImg={currentImg} />
            </S.ImageContainer>
            <S.Arrow onClick={() => setCurrentImg((idx) => (idx + 1) % 5)}>{">"}</S.Arrow>
          </S.Carousel>

          {windowWidth < 768 && (
            <S.Follow>
              <S.FollowText>Follow Chukasa for latest news</S.FollowText>
              <S.FollowInstagram>
                <a href="https://www.instagram.com/snufestival/" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "none", outline: "0", border: "0px solid transparent" }}>
                  <FaInstagram />
                </a>
              </S.FollowInstagram>
            </S.Follow>
          )}
        </S.Contents>
      </S.Box>
    </>
  );
}

export default ViewTimeTableModal;
