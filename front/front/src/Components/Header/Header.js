import React from 'react'
import Nav from './Nav'

export default function Header(props) {
    console.log(props);
    return (
        <header>
            <h1>E-Shop parrainée par Soobe</h1>
            <Nav {...props}/>
        </header>
    )
}
