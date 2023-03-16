import {useSpring, animated} from '@react-spring/web'


export default function Header(){
    const spring = useSpring({
        from: {opacity: 0, 
            y: -1000},
        to: {opacity: 1,
            y: 0},
    })
    return (
        <animated.header style={spring} className="App-header">
        <div id='header-top'></div>
        <div id='header-left'></div>
        <div id='header-right'></div>
        <button id='close-box'>?</button>
        <h1>NPC Generator</h1>
        <div id="header-body">
            <p>Generate a random character with the help of OpenAI</p>
        </div>
        <div id='header-bottom'></div>
        </animated.header>)
}