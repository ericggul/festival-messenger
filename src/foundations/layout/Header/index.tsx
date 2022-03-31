import React from "react";
import * as S from "./styles";

interface HeaderProps {
  name: String;
  color?: any;
}

function Header({ name, color = `rgba(255, 255, 255, .6)` }: HeaderProps) {
  return (
    <S.HeaderContainer color={color}>
      <S.TextContainer>
        <S.Text>{name}</S.Text>
        <S.Logo>Festival Messenger</S.Logo>
      </S.TextContainer>
    </S.HeaderContainer>
  );
}
export default Header;
