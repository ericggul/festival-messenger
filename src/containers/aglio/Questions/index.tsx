import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";

import preloadImage from "@U/functions/preload";

import { DATA } from "./data";
import Rio from "@I/aglio/result.png";

export default function Aglio({ handleNext }: any) {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answerArchive, setAnswerArchive] = useState<any[]>([]);
  const [nextMode, setNextMode] = useState(true);

  function handleAnswerClick(type: any) {
    setNextMode(true);
    setAnswerArchive((archive) => [...archive, type]);

    const timeout = setTimeout(() => {
      setQuestionIdx((idx) => idx + 1);
    }, 500);
  }

  useEffect(() => {
    setNextMode(false);
  }, [questionIdx]);

  useEffect(() => {
    if (questionIdx === 12) {
      handleNext(answerArchive);
    }
  }, [questionIdx, answerArchive]);

  return (
    <S.Container>
      <S.Inner>
        {questionIdx <= 11 && (
          <S.Contents>
            <S.QuestionSector>
              <S.Rios>
                {new Array(12).fill(0).map((_, i) => (
                  <S.Rio
                    key={i}
                    style={{
                      border: i > questionIdx ? "3px dotted #f7e38d" : "none",
                    }}
                  >
                    {i <= questionIdx && <img src={Rio} />}
                  </S.Rio>
                ))}
              </S.Rios>
              <S.QuestionIdx>Q{questionIdx + 1}/12</S.QuestionIdx>
              <S.Question>{DATA[questionIdx].question}</S.Question>
            </S.QuestionSector>

            <S.AnswerSector>
              <S.Answer
                style={{
                  transform: nextMode ? "rotateY(90deg)" : "rotateY(0)",
                  opacity: nextMode ? 0 : 1,
                }}
                onClick={() => handleAnswerClick(DATA[questionIdx].answers[0].type)}
              >
                <div>{DATA[questionIdx].answers[0].content}</div>
              </S.Answer>
              <S.Answer
                style={{
                  transform: nextMode ? "rotateY(90deg)" : "rotateY(0)",
                  opacity: nextMode ? 0 : 1,
                }}
                onClick={() => handleAnswerClick(DATA[questionIdx].answers[1].type)}
              >
                <div>{DATA[questionIdx].answers[1].content}</div>
              </S.Answer>
            </S.AnswerSector>
          </S.Contents>
        )}
      </S.Inner>
    </S.Container>
  );
}
