import React from 'react'
import './Game.scss'
import Panel from '../Panel/Panel';

const Game = () => {
    // const panels = [green, red, blue, yellow];

  return (
    <div className='game-container'>

       {/* top panels: green + red */}
       <div className='panels-top' onClick={''} >
            <Panel color='green' onClick={''} />
            <Panel color='red' onClick={''} />
       </div>
       
       {/* bottom panels: yellow + blue */}
       <div className='panels-bottom'>
            <Panel color='yellow' onClick={''} />
            <Panel color='blue' onClick={''}/>
       </div>
      
    </div>
  )
}

export default Game
