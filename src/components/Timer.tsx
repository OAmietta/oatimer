import React, { useState, useEffect, useRef, useCallback } from "react";
import Session from "./TimerSession";
import { ReactComponent as PlayIcon } from "../assets/play.svg";
import { ReactComponent as StopIcon } from "../assets/stop.svg";

function Timer() {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [sessionLength, setSessionLength] = useState(6 * 5);
  const [timeLeft, setTimeLeft] = useState(sessionLength);
  const [editFlag, setEditFlag] = useState(false);

  // useEffect(() => {
  //     setTimeLeft(sessionLength);
  // }, [sessionLength]);

  const handleResetButtonClick = useCallback(() => {
    audioElement?.current?.load();
    if (intervalId) {
      // if it exists
      clearInterval(intervalId);
    }
    setIntervalId(null);
    setSessionLength(sessionLength);
    setTimeLeft(sessionLength);
    setEditFlag(true);
  }, [intervalId, sessionLength]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleResetButtonClick();
      audioElement?.current?.play(); // ? es optional chaining, if its null dont do nothing
    }
  }, [timeLeft, handleResetButtonClick]);

  const isStarted = intervalId !== null;

  const decrementSessionLengthBy15Sec = () => {
    if (!isStarted) {
      const newSessionLength = sessionLength - 15;
      if (newSessionLength > 0) {
        setSessionLength(newSessionLength);
      }
    }
  };
  const incrementSessionLengthBy15Sec = () => {
    if (!isStarted) {
      setSessionLength(sessionLength + 15);
    }
  };

  const handleStartStopClick = useCallback(() => {
    audioElement?.current?.load();
    if (editFlag) {
      setTimeLeft(sessionLength);
      setEditFlag(false);
    }
    if (isStarted) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);
    } else if (timeLeft < 1) {
      handleResetButtonClick();
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000); //turn back into 1000ms = 1sec
      setIntervalId(newIntervalId);
    }
  }, [
    timeLeft,
    sessionLength,
    handleResetButtonClick,
    isStarted,
    intervalId,
    editFlag,
  ]);

  const show = () => {
    document.querySelector("#dinamic")!.classList.add("hide");
    document.querySelector("#time-left")!.classList.add("show");
  };

  return (
    <div>
      <div>
        <Session
          handleStartStopClick={handleStartStopClick}
          timeLeft={timeLeft}
          sessionLength={sessionLength}
          decrementSessionLengthBy15Sec={decrementSessionLengthBy15Sec}
          incrementSessionLengthBy15Sec={incrementSessionLengthBy15Sec}
          handleResetButtonClick={handleResetButtonClick}
          startStopButtonLabel={
            isStarted ? (
              <StopIcon className="btn" />
            ) : (
              <PlayIcon className="btn" onClick={show} />
            )
          }
        />
      </div>
      <audio id="beep" ref={audioElement}>
        <source
          src="https://onlineclock.net/audio/options/cuckoo-clock.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}
export default Timer;
