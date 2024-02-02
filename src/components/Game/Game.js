import React, { useEffect, useRef, useState } from 'react'
import useSound from 'use-sound';
import Panel from '../Panel/Panel';
import './Game.scss'

const panels = ['green', 'red', 'blue', 'yellow']

const Game = ({ mute, strict }) => {
    const [sequence, setSequence] = useState([]);
   
    const [playing, setPlaying] = useState(false);
    const [round, setRound] = useState(0);
    const [btnDisplay, setBtnDisplay] = useState('Play')

    let attempt = [];

    /* refs */
    const greenRef = useRef(null);
    const redRef = useRef(null);
    const blueRef = useRef(null);
    const yellowRef = useRef(null);
    const refs = [greenRef, redRef, blueRef, yellowRef]

    const sounds = {
        green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
        yellow: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
        error: new Audio ("https://s3.amazonaws.com/adam-recvlohe-sounds/error.wav")
    };


    const play = () => {
        if (!playing) {
          setPlaying(true);

          if (sequence.length===0) {
            incrementSequence();


          }

        }
    }

    const tryAgain = () => {
      attempt = [];
      // if (!playing) {
      //   setPlaying(true);

      // }

      // setPlaying(false);
      // if (!playing) {
      //   setPlaying(true);

      // }
      // console.log('again');
      // if (!playing) {
      //   setPlaying(true);
      // }

    }

    const resetGame = () => {
      setSequence([]);
      attempt = [];
      setPlaying(false);
      setRound(0);
    }

    const incrementSequence = () => { // adds new random panel to the sequence array
      // get random element from the panels array
      const color = panels[Math.floor(Math.random() * 4)];

      // add random element to the existing sequence
      setSequence([...sequence, color]);
      setBtnDisplay(sequence.length+1);
      console.log(sequence)

    }

    const flashPanel = (panel) => {
      let colorRef = null;
      let sound = null;

      if (panel === "green") {
          colorRef = greenRef;
          sound = sounds["green"]
          
      };

      if (panel === "red") {
          colorRef = redRef
          sound = sounds["red"]
      };

      if (panel === "yellow") {
          colorRef = yellowRef
          sound = sounds["yellow"]

      };

      if (panel === "blue") {
          colorRef = blueRef
          sound = sounds["blue"]

      };
      
      colorRef.current.classList.add("active");
      if (!mute) {
        sound.play();
      }

      setTimeout(() => {
        colorRef.current.classList.remove("active");
      }, 450);
    
    };

    const flashAllPanels = () => {

      refs.forEach((ref) => {
        ref.current.classList.add("active");
      })
      if (!mute) {
       sounds.error.play()
      }
      setBtnDisplay('NO!')
      

      setTimeout(() => {
        refs.forEach((ref) => {
          ref.current.classList.remove("active");
        })
        setBtnDisplay(strict ? 'Play' : 'Again')
      }, 450);

    }



    const handlePanelClick = (e) => {
      if (playing) {
        
        const colorClick = e.target.id;
        flashPanel(colorClick)
        attempt.push(colorClick)

        if (colorClick === sequence[attempt.length-1]) {
          console.log('yess')
          if (sequence.length === attempt.length) {
            setTimeout(() => {   
              incrementSequence();
            }, 850)
          }

        } else {
          setPlaying(false);
          flashAllPanels();
          if (strict) {
            resetGame();
          } else {
            tryAgain();
          }
         
        }
      }
    }

    const handleStart = (e) =>  {
      play();
      if (sequence.length > 0) {
        setBtnDisplay(sequence.length);

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
                sound = sounds["green"]
            };

            if (sequence[i] === "red") {
                colorRef = redRef
                sound = sounds["red"]
            };

            if (sequence[i] === "yellow") {
                colorRef = yellowRef
                sound = sounds["yellow"]
            };

            if (sequence[i] === "blue") {
                colorRef = blueRef
                sound = sounds["blue"]
            };
    
            // highlight the ref
            if (playing) {

              setTimeout(() => {
                colorRef.current.classList.add("active");
                if (!mute) {
                  sound.play();
                }
              
    
              setTimeout(() => {
                colorRef.current.classList.remove("active");
                if (i < sequence.length - 1) {
                  flashSequence(i + 1)
                };
              }, 450);
            }, 450);

            }

          };
    
          flashSequence();
        }
      }, [sequence, sounds, mute]);

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

       {/* centre: game controls */}
       <div className="centre">
            <button className='btn' id='btn-start' onClick={handleStart}>{btnDisplay}</button>
       </div>
      
    </div>
  )
}

export default Game