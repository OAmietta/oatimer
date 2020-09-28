import React from 'react';
import moment from 'moment';
import '../css/Session.css';
import DecrementButton from '../assets/minus.png'
import IncrementButton from '../assets/plus.png'


const Session:React.FC<Props> = ({
    sessionLength,
    startStopButtonLabel,
    timeLeft,
    timerLabel,
    handleStartStopClick,
    decrementSessionLengthBy15Sec,
    incrementSessionLengthBy15Sec,
    handleResetButtonClick,
    breakLength,
    decrementBreakLengthBy15Sec,
    incrementBreakLengthBy15Sec,
    }) => {   
    const formattedSessionLength = moment.duration(sessionLength, 's').format('mm:ss', {trim : false});
    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', {trim : false});
    const formattedBreakLength = moment.duration(breakLength, 's').format('mm:ss', {trim : false});

    const hide = () =>{
        document.querySelector("#dinamic")!.classList.remove("hide");
        document.querySelector("#dinamic2")!.classList.remove("hide");
        document.querySelector("#time-left-p")!.classList.remove("show");
        document.querySelector("#dinamic3")!.classList.remove("show");
        handleResetButtonClick();
        } 

        // function Active() {
        //     if (timerLabel === 'Session') {
        //         return (
        //             <div className="events-display">
        //                 {/* <img alt="active" className="events" src={Active}/> */}
        //                 <div className="events">{Active}</div>
        //                 <div className="events">{Inactive}</div>
        //                 {/* <img alt="inactive" className="events" src={Inactive}/> */}
        //             </div>
        //             ) 
        //      }
        //      else {
        //         return (
        //         <div className="events-display">
        //                 <div className="events">{Inactive}</div>
        //                 <div className="events">{Active}</div>
                        
        //         </div>)
        //     }
        //     ;
        //   }
    return (
        <div className="pomodoro">
                <p className="timer-label-p">Podometer</p>
                <p id="time-left-p" className="time-left-p">{formattedTimeLeft}</p>
                <p id="dinamic3" className="none-label-p">{timerLabel}</p>
                
                <div id="dinamic">
                    <p className="timer-label-p">Session</p>
                    <div className="p-session">
                        <img alt="decrement"className="crement-btn-p" src={DecrementButton} onClick={decrementSessionLengthBy15Sec}/>
                        <p className="time-left-session-p">{formattedSessionLength}</p>
                        <img alt="increment"className="crement-btn-p" src={IncrementButton} onClick={incrementSessionLengthBy15Sec}/>
                    </div>
                </div>
                <div id="dinamic2">
                    <p className="timer-label-p">Break</p>
                    <div className="p-session">
                        <img alt="decrement"className="crement-btn-p" src={DecrementButton} onClick={decrementBreakLengthBy15Sec}/>
                        <p className="time-left-session-p">{formattedBreakLength}</p>
                        <img alt="increment"className="crement-btn-p" src={IncrementButton} onClick={incrementBreakLengthBy15Sec}/>
                    </div>
                </div>
                <div onClick={handleStartStopClick}>
                            {startStopButtonLabel}
                </div>
                <div className="row">
                    <p className="event-btn-p" onClick={hide}>Edit</p>
                    <p className="event-btn-p" onClick={handleResetButtonClick}>Reset</p>
                </div>
        </div>
    )
};

type Props = {
    sessionLength: number;
    startStopButtonLabel: object;
    timeLeft: number;
    timerLabel: string;
    handleStartStopClick: () => void;
    decrementSessionLengthBy15Sec: () => void;
    incrementSessionLengthBy15Sec: () => void;
    handleResetButtonClick: () => void;
    breakLength: number;
    decrementBreakLengthBy15Sec: () => void;
    incrementBreakLengthBy15Sec: () => void;
}

export default Session
