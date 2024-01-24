import React, { useEffect, useRef, useState } from 'react'

import Panel from '../Panel/Panel';
import './Game.scss'

const panels = ['green', 'red', 'blue', 'yellow']

const Game = () => {
    const [sequence, setSequence] = useState([]);
    const [attempt, setAttempt] = useState([]);
    const [playing, setPlaying] = useState(false);

    /* refs */

    const greenRef = useRef(null);
    const redRef = useRef(null);
    const blueRef = useRef(null);
    const yellowRef = useRef(null);


    const startGame = () => {
        if (!playing) {
            play()
        }
    }

    const play = () => {
        // setSequence(() => getRandomSequence())
       incrementSequence();
    }


    // function that returns a random sequence of 20 indexes ranging from 0-3
    // function getRandomSequence() {
    //     let arr = [];
    //     for (let i = 0; i < 20; i++) {
    //         arr.push(Math.floor(Math.random() * 4));
    //     }
    //     return arr;
    // }

    function incrementSequence() {
        // get random element from the panels array
        const color = panels[Math.floor(Math.random() * 4)];

        // add random element to the existing sequence
        setSequence([...sequence, color]);
        console.log(sequence)
    }

    useEffect(() => {
        const flashSequence = () => {}

        flashSequence();
        

    }, [sequence])

  return (
    <div className='game-container'>

       {/* top panels: green + red */}
       <div className='panels-top' onClick={''} >
            <Panel color='green' onClick={''} ref={greenRef}/>
            <Panel color='red' onClick={''} ref={redRef}/>
       </div>
       
       {/* bottom panels: yellow + blue */}
       <div className='panels-bottom'>
            <Panel color='yellow' onClick={''} ref={yellowRef} />
            <Panel color='blue' onClick={''} ref={blueRef} />
       </div>

       <div className="centre">
            <button className='btn' id='btn-start' onClick={startGame}>Start</button>
            <div className='counter'>-</div>
       </div>
      
    </div>
  )
}

export default Game
