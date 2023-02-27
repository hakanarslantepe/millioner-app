import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import wait from "../sounds/wait.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

export default function Trivia({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  //   useEffect(() => {
  //     letsPlay();
  //   }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(2000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question} </div>
      <div className="answers">
        {question.answers?.map((a, key) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            key={key}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
