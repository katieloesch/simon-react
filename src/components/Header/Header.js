import React from 'react'
import './Header.scss'

const Header = ({ mute, setMute, strict, setStrict }) => {
  return (
    <div className='header'>
        <h1 className='h-main'>Simon</h1>

        <div className="btns-strict-mute">

          <div className='mute-container'>
            <input className="toggle" type="checkbox" id="toggle-mute" checked={mute} onChange={(e) => setMute(e.target.checked)}></input>
            <span className="label" id="label-mute">Mute</span>
          </div>

          <div className='strict-container'>
            <input className="toggle" type="checkbox" checked={strict} onChange={(e) => setStrict(e.target.checked)} id="toggle-strict"></input>
            <span className="label" id="label-strict">Strict Mode</span>
          </div>

          <div className='rules-container'>
            <span className='btn-rules'>rules</span>
          </div>

        </div>
    </div>
  )
}

export default Header
