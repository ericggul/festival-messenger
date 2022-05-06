import React, { useEffect, useState, useRef, useMemo } from "react";
import useAuth, { NO_PROFILE } from "@U/hooks/useAuth";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";
import { useNavigate } from "react-router-dom";

import LoadingContainer from "@C/Loading";

//icons
import Cancel from "@I/icons/modal/cancel.svg";
import Send from "@I/icons/footer/outline/send.svg";

//redux
import { useAppDispatch, useAppSelector } from "@R/common/hooks";
import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";

//analytics
import { EventBehavior } from "@U/initializer/googleAnalytics";

function ViewVideoModal({ setIsModalOpen }: any) {
  return (
    <>
      <S.Background />

      <S.Box>
        <S.CloseButton onClick={() => setIsModalOpen(false)}>
          <S.CloseIcon src={Cancel} />
        </S.CloseButton>

        <S.Contents>
          <S.Video>
            <iframe
              style={{
                width: "100%",
                height: "100%",
                borderRadius: ".75rem",
              }}
              allow="autoplay"
              src="https://www.youtube.com/embed/w3UaqYwfEEM?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
          </S.Video>
        </S.Contents>
      </S.Box>
    </>
  );
}

export default ViewVideoModal;
