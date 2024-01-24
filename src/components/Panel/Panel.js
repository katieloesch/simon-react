import React from 'react'
import './Panel.scss'

const Panel = ({ color, onClick }) => {
  return (
    <button className='panel' id={color} onClick={onClick}></button>
  )
}

export default Panel
