import React, { useEffect, useState, useRef, useCallback } from "react";
import * as S from "./styles";

//containers
import MainTextInput from "@C/writeMessage/textInputs/MainTextInput";
import ToTextInput from "@C/writeMessage/textInputs/ToTextInput";

//Foundations
import Utils from "@F/writeMessage/Utils";
import MessageBackground from "@/foundations/background/messageBackground/MessageBackground";
import AddImage from "@F/writeMessage/addImage/AddImage";

//Redux
import { useAppDispatch, useAppSelector } from "@R/common/hooks";
import { actions } from "@R/singleMessage/messagePreview/state";

//audio assets
import AUDIO_LIST from "@S/assets/audio/audioList";
import COLOR_LIST from "@S/assets/color/colorList";

const Complete = ({ completeCommand }: any) => {
  return <S.CompletePanel onClick={completeCommand}>작성 완료</S.CompletePanel>;
};

function WriteMessage(props: any) {
  //check if there's stored data
  const preview = useAppSelector((state) => state.singleMessagePreview);

  //Color State
  const [color, setColor] = useState(preview.color || COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)]);
  const [isTextBlack, setIsTextBlack] = useState(preview.color?.black || false);
  useEffect(() => {
    if (color?.black) {
      setIsTextBlack(true);
    } else {
      setIsTextBlack(false);
    }
  }, [color]);

  //Music State
  const [music, setMusic] = useState<any>(null);
  const [musicFile, setMusicFile] = useState(props.musicFile || null);
  const [playAudioInitial, setPlayAudioInitial] = useState(props.musicFile ? false : true);

  useEffect(() => {
    if (musicFile) {
      setPlayAudioInitial(true);
      if (typeof musicFile === "number") {
        setMusic(AUDIO_LIST[musicFile].file);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(musicFile);
        reader.addEventListener("load", () => {
          setMusic(reader.result);
        });
      }
    }
  }, [musicFile]);

  //Font State
  const [font, setFont] = useState(preview.font || "Seoul Namsan");

  //Display Image Container
  const [displayAddImage, setDisplayAddImage] = useState(true);

  //Get Name, Text and Image States on Complete Button Click
  const [getNameState, setGetNameState] = useState(false);
  const [getTextState, setGetTextState] = useState(false);
  const [getImageState, setGetImageState] = useState(false);

  //name, mainText and Image
  const [name, setName] = useState(preview.toName || props?.name || "");
  const [mainText, setMainText] = useState(preview.mainText || "");
  const [imageFile, setImageFile] = useState<any>(props.imageFile || null);

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

  useEffect(() => {
    if (dataRetrivedStatus === 3) {
      if (name === "" || mainText === "") {
        alert("이름이나 내용이 불충분합니다.");
        return;
      }
      handlePreviewingSendData();
    }
  }, [dataRetrivedStatus, name, mainText, imageFile]);

  //send main data:
  //Contents: name, mainText, imageFile
  //Styles & Utils: color, music. font
  //imageFile and musicFile will be possibly 'undefined'
  const dispatch = useAppDispatch();

  const handlePreviewingSendData = useCallback(async () => {
    try {
      await dispatch(
        actions.setValues({
          toId: props?.id && props?.id !== -1 ? props?.id : "unassigned",
          toName: name,
          uuid: props?.uuid || "unassigned",
          latLngPos: props?.latLng || null,
          mainText,
          color,
          font,
        })
      );
      alert("Preview!");
      props.moveToPreview(imageFile, musicFile);
    } catch (error) {
      console.log(error);
    }
  }, [name, mainText, imageFile, color, musicFile, font, dispatch, props]);

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
      <MessageBackground color={color} audio={music} playAudioInitial={playAudioInitial} />

      <S.MessagePanel font={font} isTextBlack={isTextBlack}>
        <ToTextInput
          defaultName={name}
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
            defaultImage={imageFile}
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
          defaultText={mainText}
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
