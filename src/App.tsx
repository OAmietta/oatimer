import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    NavLink,
  } from "react-router-dom";
import './css/App.css'
import Pomodoro from './components/PomodoroTimer'
import Chronometer from './components/Chronometer'
import Timer from './components/Timer'
import logo from './assets/logo.png'
import ChronoBtn from './assets/chrono-b.png'
import TimerBtn from './assets/timer-b.png'
import PomoBtn from './assets/pomo-b.png'

export default function App(){

return (
    <Router basename="/">
      <div>
        <div className="menu-g">
          <NavLink
              to="/pomodoro" 
              activeStyle={{
                fontWeight: "bold",
                fontStyle:"italic",
              }}
            >
              <div> 
              <img className="btn-menu" alt="Pomodoro" src={PomoBtn} />
              <p className="btn-label-menu">Podom</p>
            </div>
          </NavLink>
          <NavLink
              to="/timer"
              activeStyle={{
                fontWeight: "bold",
                fontStyle:"italic",
                
              }}
            >
          <div>
            <img className="btn-menu"alt="Timer" src={TimerBtn} />
            <p className="btn-label-menu">Timer</p>
          </div>
          </NavLink>
          <NavLink
              to="/chronometer"
              activeStyle={{
                fontWeight: "bold",
                fontStyle:"italic",
                
              }}
            >
          <div>
            <img className="btn-menu" alt="Chronometer" src={ChronoBtn} />
            <p className="btn-label-menu">Chrono</p>
          </div>
          </NavLink>
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pomodoro">
            <PomodoroTime />
          </Route>
          <Route path="/chronometer">
            <ChronometerTime />
          </Route>
          <Route path="/timer">
            <TimerTime />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}


function Home() {
  return (
    <div className="home">
      <div>
        <img alt="logo" className="logo" src={logo}/>
      </div>
      {/* <Link className="start-button" to="/menu">TAP ME TO START</Link> */}
    </div>
  );
}

// function MenuTime() {
//   return <Menu/>;
// }

function PomodoroTime() {
  return <Pomodoro/>;
}

function ChronometerTime() {
  return <Chronometer/>;
}

function TimerTime() {
  return <Timer/>;
}

