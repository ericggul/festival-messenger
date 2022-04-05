import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

import { useNavigate } from "react-router-dom";

//Foundations
import Utils from "@F/writeMessage/Utils";
import MessageBackground from "@F/background/MessageBackground";
import AddImage from "@F/writeMessage/addImage/AddImage";

//hooks
import useInput from "@U/hooks/useInput";

const Reality = require("../../../static/assets/audio/Reality.mp3");

const ToText = ({ defaultName, getTextState, onTextRespond, isTextBlack }: any) => {
  //Message To Text
  const { value: senderName, onChange: onSenderNameChange, setValue: setSenderName } = useInput(defaultName || "");
  useEffect(() => {
    if (getTextState) {
      onTextRespond(senderName);
    }
  }, [getTextState]);

  return (
    <S.ToText>
      Message To. <S.ToTextInput isTextBlack={isTextBlack} value={senderName} onChange={onSenderNameChange} placeholder="이름을 입력하세요" />
    </S.ToText>
  );
};

const MainText = ({ getTextState, onTextRespond, isTextBlack }: any) => {
  const { value: mainText, onChange: onMainTextChange, setValue: setMainText } = useInput("");
  const textAreaEl = useRef<any>(!null);

  const handleHeightAdjust = (e: any) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    if (getTextState) {
      onTextRespond(mainText);
    }
  }, [getTextState]);

  return (
    <S.MainText>
      <S.MainTextInput isTextBlack={isTextBlack} value={mainText} ref={textAreaEl} onKeyDown={handleHeightAdjust} onChange={onMainTextChange} placeholder="내용을 입력하세요" />
    </S.MainText>
  );
};

const Complete = ({ completeCommand }: any) => {
  return <S.CompletePanel onClick={completeCommand}>작성 완료</S.CompletePanel>;
};

function WriteMessage(props: any) {
  console.log(props?.id, props?.latLng);
  const navigate = useNavigate();

  const [color, setColor] = useState({ h: 144, s: 17, l: 42, black: false });
  const [isTextBlack, setIsTextBlack] = useState(false);
  const [music, setMusic] = useState<any>(!null);
  const [font, setFont] = useState(null);

  useEffect(() => {
    if (color?.black) {
      setIsTextBlack(true);
    } else {
      setIsTextBlack(false);
    }
  }, [color]);

  //Display Image Container
  const [displayAddImage, setDisplayAddImage] = useState(true);

  //Get Name, Text and Image States on Complete Button Click
  const [getNameState, setGetNameState] = useState(false);
  const [getTextState, setGetTextState] = useState(false);
  const [getImageState, setGetImageState] = useState(false);
  const [name, setName] = useState("");
  const [mainText, setMainText] = useState("");
  const [image, setImage] = useState<any>(!null);
  const [dataRetrivedStatus, setDataRetrivedStatus] = useState(0);
  const handleComplete = () => {
    setDataRetrivedStatus(0);
    setGetNameState(true);
    setGetTextState(true);
    if (displayAddImage) {
      setGetImageState(true);
    } else {
      setImage(null);
    }
  };

  console.log(music);

  //Preview State
  const [previewing, setPreviewing] = useState(false);

  useEffect(() => {
    if (dataRetrivedStatus === 3) {
      if (name === "" || mainText === "") {
        alert("이름이나 내용이 불충분합니다.");
        return;
      }
      setPreviewing(true);
      alert("Preview!");
    }
  }, [dataRetrivedStatus, name, mainText, image]);

  return (
    <S.Container>
      <Utils
        onColorChange={(cl: any) => setColor(cl)}
        onMusicChange={(mz: any) => setMusic(mz)}
        onFontChange={(ft: any) => setFont(ft)}
        displayAddImageOption={!displayAddImage}
        onAddImageCommand={() => setDisplayAddImage(true)}
      />
      <MessageBackground color={color} audio={music.file} />

      <S.MessagePanel font={font} isTextBlack={isTextBlack}>
        <ToText
          defaultName={null}
          getTextState={getNameState}
          onTextRespond={(text: any) => {
            setName(text);
            setGetNameState(false);
            setDataRetrivedStatus((st) => st + 1);
          }}
          isTextBlack={isTextBlack}
        />
        {displayAddImage && (
          <AddImage
            deleteAddImageContainer={() => setDisplayAddImage(false)}
            getImageState={getImageState}
            onImageRespond={(img: any) => {
              setImage(img);
              setGetImageState(false);
              setDataRetrivedStatus((st) => st + 1);
            }}
          />
        )}

        <MainText
          getTextState={getTextState}
          onTextRespond={(text: any) => {
            setMainText(text);
            setGetTextState(false);
            setDataRetrivedStatus((st) => st + 1);
          }}
          isTextBlack={isTextBlack}
        />
        <Complete completeCommand={handleComplete} />
      </S.MessagePanel>
    </S.Container>
  );
}
export default WriteMessage;
