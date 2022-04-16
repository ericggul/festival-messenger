import React, { useMemo } from "react";
import * as S from "./styles";

//navigator
import { useNavigate } from "react-router-dom";

//Redux hooks
import { useAppSelector } from "@R/common/hooks";

//helment
import { Helmet } from "react-helmet";

//Images Import
import OutlineLocation from "@I/icons/footer/outline/location.svg";
import OutlineLogin from "@I/icons/footer/outline/login.svg";
import OutlineSend from "@I/icons/footer/outline/send.svg";
import OutlineSettings from "@I/icons/footer/outline/settings.svg";

import DuoToneLocation from "@I/icons/footer/duotone/location.svg";
import DuoToneSend from "@I/icons/footer/duotone/send.svg";
import DuoToneSettings from "@I/icons/footer/duotone/settings.svg";

interface FooterProps {
  currentLoc: String;
  color?: any;
}

const IconContainer = ({ iconText, currentLoc }: any) => {
  const icon = useMemo(() => {
    if (iconText === currentLoc) {
      if (iconText === "Login") {
        return OutlineLogin;
      } else if (iconText === "Messenger") {
        return DuoToneSend;
      } else if (iconText === "Settings") {
        return DuoToneSettings;
      } else {
        return DuoToneLocation;
      }
    } else {
      if (iconText === "Login") {
        return OutlineLogin;
      } else if (iconText === "Messenger") {
        return OutlineSend;
      } else if (iconText === "Settings") {
        return OutlineSettings;
      } else {
        return OutlineLocation;
      }
    }
  }, []);

  const navigate = useNavigate();

  return (
    <S.IconContainer onClick={() => navigate(`/${iconText.toLowerCase()}`)}>
      <S.Icon src={icon} selected={iconText === currentLoc} />
      <S.IconText>{iconText === currentLoc ? "" : iconText}</S.IconText>
    </S.IconContainer>
  );
};
function Footer({ currentLoc, color = `rgba(255, 255, 255, .6)` }: FooterProps) {
  //Check if Logined
  const user = useAppSelector((state) => state.users);

  return (
    <S.FooterContainer color={color}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Helmet>
      <IconContainer iconText="Messenger" currentLoc={currentLoc} />
      <IconContainer iconText="Map" currentLoc={currentLoc} />
      {user.uid ? <IconContainer currentLoc={currentLoc} iconText="Settings" /> : <IconContainer currentLoc={currentLoc} iconText="Login" />}
    </S.FooterContainer>
  );
}
export default Footer;
