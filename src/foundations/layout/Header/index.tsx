import React from "react";
import * as S from "./styles";

//helment
import { Helmet } from "react-helmet";

interface HeaderProps {
  name: String;
  color?: any;
}

function Header({ name, color = `rgba(255, 255, 255, .6)` }: HeaderProps) {
  return (
    <S.HeaderContainer color={color}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Helmet>
      <S.TextContainer>
        <S.Text>{name}</S.Text>
        <S.Logo>Festival Messenger</S.Logo>
      </S.TextContainer>
    </S.HeaderContainer>
  );
}
export default Header;
