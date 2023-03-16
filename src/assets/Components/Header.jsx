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
        <h1>NPC Generator</h1>
        <p>Generate a random character with the help of OpenAI</p>
        </animated.header>)
}