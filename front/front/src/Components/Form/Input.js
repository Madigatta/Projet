import React from 'react'

function Input(props) {
    return (
        <input className={props.className} type={props.type} value={props.value} onChange={props.onChange} onClick={props.onClick}/>
    )
}

export default Input
