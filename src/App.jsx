import React, {useState} from 'react'
import reactLogo from './assets/react.svg'
// Database for names, classes, etc.
import * as db from './db.js'
// CSS
import './App.css'
import {useSpring, animated} from '@react-spring/web'
// AI Config
import {Configuration, OpenAIApi} from 'openai'
// React Bootstrap Imports
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
// PDF export
import jsPDF from 'jspdf'
// Components
import CustomParams from './assets/Components/customParams.jsx'
import Card from './assets/Components/Card.jsx'
import Header from './assets/Components/Header.jsx'
import GenerateButtons from './assets/Components/GenerateButtons.jsx'

// Global
var openai = null;

// Main Render to DOM
function App() {
  return (
    <div className="App">
      <ProfileCard />
    </div>
  )
}

function ApiForm(){
  const [key, setKey] = useState('')
  const [message, setMessage] = useState('Input your Open AI API Key first to continue')
  const [color, setColor] = useState('yellow-text')
  const springs = useSpring({
    from: {opacity: 0},
    to: {opacity: 1}
  })

  const [fadeIn, setFadeIn] = useSpring(() =>({
    from: {opacity: 0}
  }))

  function configureAI(){
    setFadeIn.start({
      from: {opacity: 0},
      to: {opacity: 1}
    })
    setColor('white-text')
    setMessage('Configuring AI...')
    const config = new Configuration({
      apiKey: key
    })
    
    openai = new OpenAIApi(config);
    const response = openai.listModels()
    // Log if the promise is resolved or rejected
    response.then((response) => {
      console.log('Promise resolved')
      setMessage('API Key Configured, good to go!')
      // remove class hidden
      document.getElementById('mainContainer').classList.remove('hidden')
      setColor('green-text')
    }).catch((error) => {
      console.log('Promise rejected')
      setColor('red-text')
      setMessage('Error with API key provided: ' + error)
    })
  }
  
  return(
    <animated.div style={springs} className=' mb-2 '>
      <p className=' d-inline
      '>Open AI API Key (Your data is not saved): </p>
      <input type='password' className='d-block w-75' name="api-key" id="" placeholder='Input OpenAI API key here' value={key} onChange={(e) => setKey(e.target.value)}/>
      <Button className='mt-2 mb-2 btn btn-light d-block' variant='primary' onClick={configureAI}>Configure AI</Button>
      <animated.p style={fadeIn} className={color}>{message}</animated.p>
      </animated.div>
    )
}
// Adds customizable options to the profile card --> ProfileCard
function CustomField(){
  return(
    <Accordion className='customHistory rounded-3 ms-0 p-0 mt-3'>
      <Accordion.Header>
        Custom Options
      </Accordion.Header>
      <Accordion.Body>
        <h2>Additional History</h2>
        <textarea name="additionalHistory" id="customHistory" cols="30" rows="3" placeholder='Additional background to include (Add before pressing Generate History button)'></textarea>
      </Accordion.Body>
    </Accordion>
  )
}

function LoadingSlime(){
  return(
    <img src='public/images/slime_black.gif' alt="" />
  )
}

// Main component --> App
class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: db.fName[this.randomNum(0,db.fName.length -1)] + ' ' + db.lName[this.randomNum(0,db.lName.length-1)],
      age: this.randomNum(18, 100),
      class: db.classRPG[this.randomNum(0,db.classRPG.length-1)],
      race: db.race[this.randomNum(0, db.race.length-1)],
      history: 'Click generate history to generate a random history for this character',
      additionalHistory: '',
      archetype: db.archetype[this.randomNum(0,db.archetype.length-1)],
      quirks: [db.quirks[this.randomNum(0,db.quirks.length-1)], db.quirks[this.randomNum(0,db.quirks.length-1)], db.quirks[this.randomNum(0,db.quirks.length-1)]].join(', '),
      image: 'https://phoenixdex.alteredorigin.net/images/characters/character-placeholder.png'
    }
  }  
  regenerateAll(){
    this.setState({name: db.fName[this.randomNum(0,db.fName.length -1)] + ' ' + db.lName[this.randomNum(0,db.lName.length-1)]})
    this.setState({age: this.randomNum(18, 100)})
    this.setState({class: db.classRPG[this.randomNum(0,db.classRPG.length-1)]})
    this.setState({race: db.race[this.randomNum(0, db.race.length-1)] })
    this.setState({archetype: db.archetype[this.randomNum(0,db.archetype.length-1)]})
    this.setState({quirks: [db.quirks[this.randomNum(0,db.quirks.length-1)], db.quirks[this.randomNum(0,db.quirks.length-1)], db.quirks[this.randomNum(0,db.quirks.length-1)]].join(', ')})
  }
  // Set Custom Parameters
  setCustomName(name){
    var customName = document.getElementById('customName').value
    this.setState({name: customName})
  }
  setCustomArchetype(arcetype){
    var customArchetype = document.getElementById('customArchetype').value
    this.setState({archetype: customArchetype})
  }
  setCustomAge(age){
    var customAge = document.getElementById('customAge').value
    this.setState({age: customAge})
  }
  setCustomRace(race){
    var customRace = document.getElementById('customRace').value
    this.setState({race: customRace})
  }
  setCustomClass(classRPG){
    var customClass = document.getElementById('customClass').value
    this.setState({class: customClass})
  }
  toggleCustomFields(){
    // get all customField ids
    var customFields = document.getElementsByClassName('customField')
    // toggle display
    for (var i = 0; i < customFields.length; i++){
      if (customFields[i].style.display === 'none' || customFields[i].style.display === ''){
        customFields[i].style.display = 'inline-block'
      } else {
        customFields[i].style.display = 'none'
      }
    }
  }
  generateHistory(max_tokens){
    var addHistory = document.getElementById('customHistory').value
    // this.setState({history: 'Generating history, this might take a while don\'t close the page...'})
    this.setState({history: 'Generating history, this might take a while don\'t close the page... <img class="slime-load" src="./images/slime_black.gif" alt="" />'})
    openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a background history in the style of Dungeons and Dragons for a fantasy character named ${this.state.name} who is a ${this.state.quirks} ${this.state.race} ${this.state.class} and ${this.state.age} years old.
      This character is also a ${this.state.archetype}. Also, ${addHistory}. Generate this in html format with <p> tags and <h2> as titles for each notable moment in his history.`,
      max_tokens: max_tokens,
      temperature: 0.2,
    }).then((response) => {
      this.setState({history: response.data.choices[0].text})
      console.log(this.state.history)
      return response.data.choices[0].text
    })
  }
  // Disabled and probably won't do anymore
  generateImage(){
    this.setState({image: 'Generating image...'})
    const response = openai.createImage({
      prompt: `Generate a realistic fantasy portrait of a ${this.state.quirks} ${this.state.race} ${this.state.class} named ${this.state.name} who is ${this.state.age} years old. This character is dresed as a fantasy ${this.state.archetype} ${this.state.class}.`,
      n: 1,
      size: '256x256'
    }).then((response) => {
      console.log(response.data)
      this.setState({image: response.data.data[0].url})
      console.log(this.state.image)
      return response.data.images[0]
    })
  }
  exportToPDF(){
    var doc = new jsPDF(
      {
        orientation: 'landscape',
        unit: 'px',
        format: 'a4',
      }
    )
    doc.setFontSize(12)
    doc.text(20, 20, 'Name: ' + this.state.name)
    doc.text(20, 40, 'Age: ' + this.state.age)
    doc.text(20, 60, 'Class: ' + this.state.class)
    doc.text(20, 80, 'Race: ' + this.state.race)
    doc.text(20, 100, 'Archetype: ' + this.state.archetype)
    doc.text(20, 120, 'Quirks: ' + this.state.quirks)
    
    var history = this.state.history.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<h2>/g, '').replace(/<\/h2>/g, '').replace(/<br>/g, '')
    doc.text(20, 140, 'History: ' + history, {maxWidth: 500})
    doc.save('a4.pdf')
    
  }
  // Utility
  randomNum(min, max){
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }
  render(){
    return(
      <Container fluid className=' bg-dark text-white rounded-2 p-5'>
        <Header/>
        <ApiForm />
        <div id='mainContainer' className='hidden'>
          <Button className='btn btn-light d-block' onClick={() => this.toggleCustomFields()}> Toggle Custom Fields </Button>
          <div className="mainCard">
            <h3>Name: {this.state.name}</h3>
            <CustomParams id='customName' defaultVal='Custom Name' buttonName='Set Name' click={()=>this.setCustomName()} />
            <h3>Age: {this.state.age}</h3>
            <CustomParams id='customAge' defaultVal='Custom Age' buttonName='Set Age' click={()=>this.setCustomAge()} />
            <h3>Race: {this.state.race}</h3>
            <CustomParams id='customRace' defaultVal='Custom Race' buttonName='Set Race' click={()=>this.setCustomRace()} />
            <h3>Class: {this.state.class}</h3>
            <CustomParams id='customClass' defaultVal='Custom Class' buttonName='Set Class' click={()=>this.setCustomClass()} />
            <h3>Archetype: {this.state.archetype}</h3>
            <CustomParams id='customArchetype' defaultVal='Custom Archetype' buttonName='Set Archetype' click={()=>this.setCustomArchetype()} />
            <h3>Quirks: {this.state.quirks}</h3>
            <h3>History:</h3>
            <hr />
            <div dangerouslySetInnerHTML={{__html: this.state.history}} />
          </div>
          <CustomField />
          <GenerateButtons regenerateAll={()=>this.regenerateAll()} 
          generateHistory={()=>this.generateHistory(400)}
          exportToPDF={()=>this.exportToPDF()}
          />
          </div>
      </Container>
    )
  }
}

export default App
