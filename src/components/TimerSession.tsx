import React from 'react';
import moment from 'moment';
import '../css/TimerSession.css';
import DecrementButton from '../assets/minus.png'
import IncrementButton from '../assets/plus.png'



const TimerSession:React.FC<Props> = ({
    sessionLength,
    startStopButtonLabel,
    timeLeft,
    handleStartStopClick,
    decrementSessionLengthBy15Sec,
    incrementSessionLengthBy15Sec,
    handleResetButtonClick,
    
    }) => {   

    // const sessionLengthInMinutes = moment.duration(sessionLength, 's').asMinutes();
    const formattedSessionLength = moment.duration(sessionLength, 's').format('mm:ss', {trim : false});
    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', {trim : false});
    const hide = () =>{
        document.querySelector("#dinamic")!.classList.remove("hide");
        document.querySelector("#time-left")!.classList.remove("show");
        handleResetButtonClick();
        } 
    
    return (
        <div className="timer">
                <p className="timer-label-t">Timer</p>
                <p id="time-left" className="time-left-t">{formattedTimeLeft}</p>
            
                <div id="dinamic" className="timer-session">
                    <img alt="decrement"className="crement-btn-t" src={DecrementButton} onClick={decrementSessionLengthBy15Sec}/>
                    <p className="time-left-session-t">{formattedSessionLength}</p>
                    <img alt="increment"className="crement-btn-t" src={IncrementButton} onClick={incrementSessionLengthBy15Sec}/>
                </div>
            
            
                <div onClick={handleStartStopClick}>
                            {startStopButtonLabel}
                </div>
                <div className="row">
                    <p className="event-btn-t" onClick={hide}>Edit</p>
                    <p className="event-btn-t" onClick={handleResetButtonClick}>Reset</p>
                </div>
        </div>
    )
};

type Props = {
    sessionLength: number;
    startStopButtonLabel: object;
    timeLeft: number;
    handleStartStopClick: () => void;
    decrementSessionLengthBy15Sec: () => void;
    incrementSessionLengthBy15Sec: () => void;
    handleResetButtonClick: () => void;
}

export default TimerSession
