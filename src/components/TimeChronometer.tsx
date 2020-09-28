import React from 'react';
import momentDurationFormatSetup from 'moment-duration-format';
import * as moment from 'moment';
import '../css/TimeChronometer.css';


momentDurationFormatSetup(moment);

const TimeChronometer: React.FC<Props> = ({ 
     handleStartStopClick,  
     startStopButtonLabel, 
     handleResetButtonClick,
     timeChronometer, 
     timerLabel,
    }) => {
    
        
    //show minutes:seconds
    const formattedTimeChronometer = moment.duration(timeChronometer, 's').format('mm:ss', {trim : false});
    return (
        <div className="time-cr">
            <div>
                <div className="row">
                    <p className="timer-label-cr">{timerLabel}</p>
                        
                </div>
            </div>
            <p className="time-left-cr">{formattedTimeChronometer}</p>
            <div onClick={handleStartStopClick}>
                {startStopButtonLabel}
            </div>
            <p className="event-btn-cr" onClick={handleResetButtonClick}>Reset</p>
        </div>
    )
}

type Props = {
    handleStartStopClick: () => void;
    handleResetButtonClick: () => void; 
     startStopButtonLabel: object;
     timeChronometer: number;
     timerLabel: String;
}

export default TimeChronometer;
