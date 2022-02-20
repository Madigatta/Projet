import React from 'react'

import './Card.Module.css'

import styles from './Card.Module.css'

function Card(props) {
   // console.log(props)

    const getStyle = ()=>{
        if(props.cardStyle){
            return styles.card + " " + props.cardStyle
        } else {
            return styles.card
        }
    }

    return (
        <article className={getStyle()}>
            {props.children}
        </article>
    )
}

export default Card
