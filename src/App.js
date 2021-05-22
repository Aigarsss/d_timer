import React, { useState } from 'react';
import start from './media/actions/start.svg'
import stop from './media/actions/stop.svg'

import gatis from './media/gatis.jpg';
import './App.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState({counter: 0, hours: 0, minutes: 0, seconds: 0});
  const [interv, setInterv] = useState();
  const [locationProps, setLocationProps] = useState({
    diffX: 0,
    diffY: 0,
    dragging: false,
    styles: {}
  });

// Timer functionality
  const handleClick = () => {
    if (isRunning) {
      stop();
    } else {
      setIsRunning(true);
      run();
      setInterv(setInterval(run, 1000));
    }
  }

  const stop = () => {
    clearInterval(interv);
    setIsRunning(false);
    setTime({counter: 0, hours: 0, minutes: 0, seconds: 0});
  }

  let updatedCounter = time.counter;

  const run = () => {

    // Check for 24h, then reset
    if (updatedCounter === 86400) {
      stop();
      return;
    }
    const updatedHours = Math.floor(updatedCounter / 3600);
    const updatedMinutes = Math.floor(updatedCounter % 3600 / 60);
    const updatedSeconds = Math.floor(updatedCounter % 3600 % 60);

    updatedCounter++;

    return setTime({
        counter: updatedCounter, 
        hours: updatedHours, 
        minutes: updatedMinutes, 
        seconds: updatedSeconds
      })
  }

  // Dragging functionality

  const dragStart = (e) => {
    // console.log(e.target.parentElement);
    // console.log(e.currentTarget);
    setLocationProps({
      ...locationProps, 
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true
    })
  }

  const dragging = (e) => {
    if (locationProps.dragging) {
      var left = e.screenX - locationProps.diffX;
      var top = e.screenY - locationProps.diffY;

      setLocationProps({
        ...locationProps, 
        styles: {
          left: left,
          top: top
        }
      })
    }
  }

  const dragEnd = () => {
    setLocationProps({
      ...locationProps, 
      dragging: false
    })
  }


  return (
    <>
      <img src={gatis} className="App-logo" alt="logo" />
      <div 
        className="timerContainer" 
        style={locationProps.styles}             
        onMouseDown={dragStart} 
        onMouseMove={dragging} 
        onMouseUp={dragEnd} 
      >
        <div className="timerMove"></div>

        <Icon running={isRunning} handleClick = {handleClick} />

        <div className="timerTime">
          {time.hours < 10 ? "0" + time.hours : time.hours}:
          {time.minutes < 10 ? "0" + time.minutes : time.minutes}:
          {time.seconds < 10 ? "0" + time.seconds : time.seconds}
        </div>
      </div>
    </>
  );
}

const Icon = ({running, handleClick}) => {

  return (
    <div className="timerAction" onClick = {handleClick}>
      {running ? <img src={stop} alt="stop" /> : <img src={start} alt="start" />}
    </div>
  );

}

export default App;
