import React, { useState, useEffect, useRef } from "react";
import Session from "./Session";
import PlayIcon from "../assets/play2.png";
import StopIcon from "../assets/pause.png";

function PomodoroTimer() {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [breakLength, setBreakLength] = useState(6 * 5);
  const [sessionLength, setSessionLength] = useState(6 * 5);
  const [timeLeft, setTimeLeft] = useState(sessionLength);
  const [editFlag, setEditFlag] = useState(false);

  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  useEffect(() => {
    // setTimeLeft(sessionLength);
    if (timeLeft === 0) {
      audioElement?.current?.play(); // ? es optional chaining, if its null dont do nothing
      if (currentSessionType === "Session") {
        setCurrentSessionType("Break");
        setTimeLeft(breakLength);
      } else if (currentSessionType === "Break") {
        setCurrentSessionType("Session");
        setTimeLeft(sessionLength);
      }
    }
  }, [timeLeft, breakLength, sessionLength, currentSessionType]);

  const isStarted = intervalId !== null;

  const decrementBreakLengthBy15Sec = () => {
    if (!isStarted) {
      if (timeLeft === sessionLength) {
        const newBreakLength = breakLength - 15;
        if (newBreakLength > 0) {
          setBreakLength(newBreakLength);
        }
      }
    }
  };
  const incrementBreakLengthBy15Sec = () => {
    if (!isStarted) {
      if (timeLeft === sessionLength) {
        setBreakLength(breakLength + 15);
      }
    }
  };

  const decrementSessionLengthBy15Sec = () => {
    if (!isStarted) {
      if (timeLeft === sessionLength) {
        const newSessionLength = sessionLength - 15;
        if (newSessionLength > 0) {
          setSessionLength(newSessionLength);
        }
      }
    }
  };
  const incrementSessionLengthBy15Sec = () => {
    if (!isStarted) {
      if (timeLeft === sessionLength) {
        setSessionLength(sessionLength + 15);
      }
    }
  };

  const handleStartStopClick = () => {
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
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000); //turn back into 1000ms = 1sec
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    audioElement?.current?.load();
    if (intervalId) {
      // if it exists
      clearInterval(intervalId);
    }
    setIntervalId(null);
    setCurrentSessionType("Session");
    setSessionLength(sessionLength);
    setBreakLength(breakLength);
    setTimeLeft(sessionLength);
    setEditFlag(true);
  };

  const show = () => {
    document.querySelector("#dinamic")!.classList.add("hide");
    document.querySelector("#dinamic2")!.classList.add("hide");
    document.querySelector("#dinamic3")!.classList.add("show");
    document.querySelector("#time-left-p")!.classList.add("show");
  };
  return (
    <div>
      <div>
        <Session
          timerLabel={currentSessionType}
          handleStartStopClick={handleStartStopClick}
          handleResetButtonClick={handleResetButtonClick}
          startStopButtonLabel={
            isStarted ? (
              <img alt="stopIcon" className="btn" src={StopIcon} />
            ) : (
              <img
                alt="playIcon"
                className="btn"
                src={PlayIcon}
                onClick={show}
              />
            )
          }
          timeLeft={timeLeft}
          sessionLength={sessionLength}
          decrementSessionLengthBy15Sec={decrementSessionLengthBy15Sec}
          incrementSessionLengthBy15Sec={incrementSessionLengthBy15Sec}
          breakLength={breakLength}
          decrementBreakLengthBy15Sec={decrementBreakLengthBy15Sec}
          incrementBreakLengthBy15Sec={incrementBreakLengthBy15Sec}
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

export default PomodoroTimer;
