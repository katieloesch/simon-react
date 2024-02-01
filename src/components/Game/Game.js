import React, { useEffect, useRef, useState } from 'react'
import useSound from 'use-sound';
import Panel from '../Panel/Panel';
import './Game.scss'

const panels = ['green', 'red', 'blue', 'yellow']

const Game = () => {
    const [sequence, setSequence] = useState([]);
    const [attempt, setAttempt] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [round, setRound] = useState(0);

    /* refs */

    const greenRef = useRef(null);
    const redRef = useRef(null);
    const blueRef = useRef(null);
    const yellowRef = useRef(null);

    const sounds = {
        green: new Audio(require("./../../assets/audio/do.wav")),
        red: new Audio(require("./../../assets/audio/mi.wav")),
        blue: new Audio(require("./../../assets/audio/sol.wav")),
        yellow: new Audio (require("./../../assets/audio/do_octave.wav")),
        fail: new Audio ("./../../assets/audio/fail.mp3"),
        win: new Audio ("./../../assets/audio/win.mp3")
    }

    const amazonSounds = {
        green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
        yellow: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
        error: new Audio ("https://s3.amazonaws.com/adam-recvlohe-sounds/error.wav")
    };

    const [playGreen] = useSound("./../../assets/audio/do.wav");

    const startGame = () => {
        if (!playing) {
          setPlaying(true)
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


    const flashPanel = (panel) => {
      let colorRef = null;
      let sound = null;

      if (panel === "green") {
          colorRef = greenRef;
          sound = amazonSounds["green"]
      };

      if (panel === "red") {
          colorRef = redRef
          sound = amazonSounds["red"]
      };

      if (panel === "yellow") {
          colorRef = yellowRef
          sound = amazonSounds["yellow"]
      };

      if (panel === "blue") {
          colorRef = blueRef
          sound = amazonSounds["blue"]
      };

      // highlight the ref

    colorRef.current.classList.add("active");
    sound.play();

    setTimeout(() => {
      colorRef.current.classList.remove("active");
    }, 450);
    
    };


    const incrementSequence = () => {
        // get random element from the panels array
        const color = panels[Math.floor(Math.random() * 4)];

        // add random element to the existing sequence
        setSequence([...sequence, color]);
        console.log(sequence)
    }

    const resetGame = () => {
      setSequence([]);
      setPlaying(false);
      setRound(0);


    }

    const handlePanelClick = (e) => {
      if (playing) {
        const colorClick = e.target.id;
        flashPanel(colorClick)
        
        //check if panel clicked is correct
        if (sequence[round] === colorClick) {
          console.log('correct')
          if (round === sequence.length-1) {
            setTimeout(() => {
              setRound(0);
              incrementSequence();
            }, 850)
          } else {
            setRound(round+1);
          }
        } else {
          resetGame();
          //notification: you lost!
        }

      }
    }

    useEffect(() => {
        // show sequence
        if (sequence.length > 0) {
          const flashSequence = (i = 0) => {
            let colorRef = null;
            let sound = null;
    
            if (sequence[i] === "green") {
                colorRef = greenRef;
                sound = amazonSounds["green"]
            };

            if (sequence[i] === "red") {
                colorRef = redRef
                sound = amazonSounds["red"]
            };

            if (sequence[i] === "yellow") {
                colorRef = yellowRef
                sound = amazonSounds["yellow"]
            };

            if (sequence[i] === "blue") {
                colorRef = blueRef
                sound = amazonSounds["blue"]
            };
    
            // highlight the ref
            setTimeout(() => {
                colorRef.current.classList.add("active");
                sound.play();
    
              setTimeout(() => {
                colorRef.current.classList.remove("active");
                if (i < sequence.length - 1) {
                  flashSequence(i + 1)
                };
              }, 450);
            }, 450);
          };
    
          flashSequence();
        }
      }, [sequence]);

  return (
    <div className='game-container'>

       {/* top panels: green + red */}
       <div className='panels-top' >
            <Panel color='green' onClick={handlePanelClick} ref={greenRef}/>
            <Panel color='red' onClick={handlePanelClick} ref={redRef}/>
       </div>
       
       {/* bottom panels: yellow + blue */}
       <div className='panels-bottom'>
            <Panel color='yellow' onClick={handlePanelClick} ref={yellowRef} />
            <Panel color='blue' onClick={handlePanelClick} ref={blueRef} />
       </div>

       <div className="centre">
            <button className='btn' id='btn-start' onClick={startGame}>{sequence.length===0 ? "Play" : sequence.length}</button>
            <div className='counter'>-</div>
       </div>
      
    </div>
  )
}

export default Game
