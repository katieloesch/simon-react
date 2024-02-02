import React, {forwardRef} from 'react'
import './Panel.scss'

const Panel = forwardRef(({ color, onClick }, ref) => (

    <div className={'panel'} id={color} onClick={onClick} ref={ref}></div>

));

export default Panel