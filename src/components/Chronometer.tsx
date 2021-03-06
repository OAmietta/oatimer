import React, { useState } from "react";
import TimeChronometer from "./TimeChronometer";
import { ReactComponent as PlayIcon } from "../assets/play.svg";
import { ReactComponent as StopIcon } from "../assets/stop.svg";
import "../css/Chronometer.css";

function Chronometer() {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [sessionLength, setSessionLength] = useState(0);
  const [timeChronometer, setTimeChronometer] = useState(sessionLength);

  const isStarted = intervalId !== null;

  const handleStartStopClick = () => {
    if (isStarted) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeChronometer((prevTimeChronometer) => prevTimeChronometer + 1);
      }, 1000); //turn back into 1000ms = 1sec
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    if (intervalId) {
      // if it exists
      clearInterval(intervalId);
    }
    setIntervalId(null);
    setSessionLength(0);
    setTimeChronometer(sessionLength);
  };

  return (
    <div>
      <TimeChronometer
        handleStartStopClick={handleStartStopClick}
        handleResetButtonClick={handleResetButtonClick}
        startStopButtonLabel={
          isStarted ? (
            <StopIcon className="btn" />
          ) : (
            <PlayIcon className="btn" />
          )
        }
        timeChronometer={timeChronometer}
        timerLabel="Chronometer"
      />
    </div>
  );
}

export default Chronometer;
