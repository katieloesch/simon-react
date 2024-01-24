import React, {forwardRef} from 'react'
import './Panel.scss'

const Panel = forwardRef(({ color, status, onClick }, ref) => (

    <div className={`panel ${status}`} id={color} onClick={onClick} ref={ref}></div>

));

export default Panel