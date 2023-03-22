import React, {useEffect, useState} from 'react'
import {useSpring, animated} from '@react-spring/web'
import CloseBox from './CloseBox'


export default function Header(){

    const [helpOpen, setHelpOpen] = useState(false)
    const spring = useSpring({
        from: {opacity: 0, 
            y: -1000},
        to: {opacity: 1,
            y: 0},
    })

    const fadeAnim = useSpring({
        opacity: helpOpen ? 1 : 0,
        config: {duration: 250}
    })

    function closeBox(){
        // mount CloseBox component
        setHelpOpen(!helpOpen)
        if (helpOpen){
            // unmount CloseBox component
            setHelpOpen(!helpOpen)
        }
        console.log(helpOpen)
    }

    useEffect(() => {
        if (helpOpen){
            document.getElementById('closeBox').style.display = 'block'
            document.getElementById('header-top').style.filter = 'blur(5px)'
            document.getElementById('header-left').style.filter = 'blur(5px)'
            document.getElementById('header-right').style.filter = 'blur(5px)'
            document.getElementById('header-body').style.filter = 'blur(5px)'
            document.getElementById('header-bottom').style.filter = 'blur(5px)'
            // document.getElementById('close-box').style.filter = 'blur(5px)'
            document.getElementById('heading').style.filter = 'blur(5px)'

            
        } else {
            document.getElementById('closeBox').style.display = 'none'
            document.getElementById('header-top').style.filter = 'blur(0px)'
            document.getElementById('header-left').style.filter = 'blur(0px)'
            document.getElementById('header-right').style.filter = 'blur(0px)'
            document.getElementById('header-body').style.filter = 'blur(0px)'
            document.getElementById('header-bottom').style.filter = 'blur(0px)'
            document.getElementById('close-box').style.filter = 'blur(0px)'
            document.getElementById('heading').style.filter = 'blur(0px)'

            

        }
    })
    return (
        <animated.header style={spring} className="App-header">
        <div id='header-top'></div>
        <div id='header-left'></div>
        <div id='header-right'></div>
        <animated.div style={fadeAnim}>        
            <CloseBox />
        </animated.div>
        <button onClick={closeBox} id='close-box'>?</button>
        <h1 id='heading'>NPC Generator</h1>
        <div id="header-body">
            <p>Generate a random character with the help of OpenAI</p>
        </div>
        <div id='header-bottom'></div>
        </animated.header>)
}