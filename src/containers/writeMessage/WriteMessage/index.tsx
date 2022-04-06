import React, { useEffect, useState, useRef, useCallback } from "react";
import * as S from "./styles";

import { useNavigate } from "react-router-dom";

//containers
import MainTextInput from "@C/writeMessage/textInputs/MainTextInput";
import ToTextInput from "@C/writeMessage/textInputs/ToTextInput";

//Foundations
import Utils from "@F/writeMessage/Utils";
import MessageBackground from "@F/background/MessageBackground";
import AddImage from "@F/writeMessage/addImage/AddImage";

//hooks
import useInput from "@U/hooks/useInput";

const Complete = ({ completeCommand }: any) => {
  return <S.CompletePanel onClick={completeCommand}>작성 완료</S.CompletePanel>;
};

function WriteMessage(props: any) {
  console.log(props?.id, props?.latLng);
  const navigate = useNavigate();

  const [color, setColor] = useState({ h: 144, s: 17, l: 42, black: false });
  const [isTextBlack, setIsTextBlack] = useState(false);
  const [music, setMusic] = useState<any>(undefined);
  //music File to be uploaded to firebase
  const [musicFile, setMusicFile] = useState();
  const [font, setFont] = useState("Seoul Namsan");

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

  //name, mainText and Image
  const [name, setName] = useState("");
  const [mainText, setMainText] = useState("");
  const [imageFile, setImageFile] = useState<any>(undefined);
  const [dataRetrivedStatus, setDataRetrivedStatus] = useState(0);

  //We do this to get data from the child components (name, text, image)
  const handleComplete = () => {
    setDataRetrivedStatus(0);
    setGetNameState(true);
    setGetTextState(true);
    if (displayAddImage) {
      setGetImageState(true);
    } else {
      setImageFile(null);
    }
  };

  //Preview State
  //move when 'dataretrivedstatus' is 3, ig., recieved all name, mainText and image data
  const [previewing, setPreviewing] = useState(false);

  useEffect(() => {
    if (dataRetrivedStatus === 3) {
      if (name === "" || mainText === "") {
        alert("이름이나 내용이 불충분합니다.");
        return;
      }
      setPreviewing(true);
      handlePreviewingSendData();
      alert("Preview!");
    }
  }, [dataRetrivedStatus, name, mainText, imageFile]);

  //send main data:
  //Contents: name, mainText, imageFile
  //Styles & Utils: color, music. font
  const handlePreviewingSendData = useCallback(() => {
    console.log(name, mainText, imageFile, color, musicFile, font);
    //To do : Redux Code
  }, [name, mainText, imageFile, color, musicFile, font]);

  return (
    <S.Container>
      <Utils
        onColorChange={(cl: any) => setColor(cl)}
        onMusicChange={(mz: any, mzFile: any) => {
          setMusic(mz);
          setMusicFile(mzFile);
        }}
        onFontChange={(ft: any) => setFont(ft)}
        displayAddImageOption={!displayAddImage}
        onAddImageCommand={() => setDisplayAddImage(true)}
      />
      <MessageBackground color={color} audio={music} />

      <S.MessagePanel font={font} isTextBlack={isTextBlack}>
        <ToTextInput
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
              setImageFile(img);
              setGetImageState(false);
              setDataRetrivedStatus((st) => st + 1);
            }}
          />
        )}

        <MainTextInput
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
