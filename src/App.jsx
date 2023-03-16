import React, {useState} from 'react'
import reactLogo from './assets/react.svg'
// Database for names, classes, etc.
import * as db from './db.js'
// CSS
import './App.css'
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

// 
// const config = new Configuration({
//   organization: 'org-YqkSoqf18JKiZxGkdJpc0NSW',
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY
// })

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
  const [message, setMessage] = useState('API Key Not Configured')

  function configureAI(){
    const config = new Configuration({
      apiKey: key
    })
    openai = new OpenAIApi(config);
    console.log(openai)
    setMessage('API Key Configured')
  }
  

  return(
    <div className=' mb-2 '>
      <p className=' d-inline
      '>Open AI API Key (Not Saved): </p>
      <input className='d-block w-75' type="text" name="api-key" id="" value={key} onChange={(e) => setKey(e.target.value)}/>
      <Button className='mt-2 mb-2 btn btn-light d-block' variant='primary' onClick={configureAI}>Configure AI</Button>
      <p>{message}</p>
      </div>
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

// Main component --> App
class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: db.fName[this.randomNum(0,db.fName.length -1)] + ' ' + db.lName[this.randomNum(0,db.lName.length-1)],
      age: this.randomNum(18, 100),
      class: db.classRPG[this.randomNum(0,db.classRPG.length-1)],
      race: db.race[this.randomNum(0, db.race.length-1)],
      history: '',
      additionalHistory: '',
      archetype: db.archetype[this.randomNum(0,db.archetype.length-1)],
      quirks: [db.quirks[this.randomNum(0,db.quirks.length-1)], db.quirks[this.randomNum(0,db.quirks.length-1)], db.quirks[this.randomNum(0,db.quirks.length-1)]].join(', '),
      image: 'https://phoenixdex.alteredorigin.net/images/characters/character-placeholder.png'
    }
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
    // console.log('Generating history for: ' + this.state.name + ' who is a ' + this.state.race + ' ' +   this.state.quirks + ' '+ this.state.archetype + ' ' + this.state.class + ' and ' + this.state.age + ' years old.')
    this.setState({history: 'Generating history...'})
    openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a background history in the style of Dungeons and Dragons for a fantasy character named ${this.state.name} who is a ${this.state.quirks} ${this.state.race} ${this.state.class} and ${this.state.age} years old.
      This character is a ${this.state.archetype}. Also, ${addHistory}.Generate this in html format with <p> tags and <h2> as titles for each notable moment in his history.`,
      max_tokens: max_tokens,
      temperature: 0.2,
    }).then((response) => {
      this.setState({history: response.data.choices[0].text})
      console.log(this.state.history)
      return response.data.choices[0].text
    })
  }

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
        <Button className='btn btn-light d-block' onClick={() => this.toggleCustomFields()}> Toggle Custom Fields </Button>
        <hr />
        <div className="mainCard">
          <h3>Name: {this.state.name}</h3>
          <CustomParams id='customName' defaultVal='Custom Name' buttonName='customName' click={()=>this.setCustomName()} />
          <h3>Age: {this.state.age}</h3>
          <CustomParams id='customAge' defaultVal='Custom Age' buttonName='customAge' click={()=>this.setCustomAge()} />
          <h3>Race: {this.state.race}</h3>
          <CustomParams id='customRace' defaultVal='Custom Race' buttonName='customRace' click={()=>this.setCustomRace()} />
          <h3>Class: {this.state.class}</h3>
          <CustomParams id='customClass' defaultVal='Custom Class' buttonName='customClass' click={()=>this.setCustomClass()} />
          <h3>Archetype: {this.state.archetype}</h3>
          <CustomParams id='customArchetype' defaultVal='Custom Archetype' buttonName='customArchetype' click={()=>this.setCustomArchetype()} />
          <h3>Quirks: {this.state.quirks}</h3>
          <h3>History:</h3>
          <hr />
          <div dangerouslySetInnerHTML={{__html: this.state.history}} />
        </div>
        {/* Component */}
        <CustomField />
        {/*  */}
        <Button className='btn customButtons' variant="light" onClick={() => this.generateHistory(400)}>
          Generate History
        </Button>
        <Button className='btn d-inline ms-3 customButtons' variant="light" onClick={() => this.exportToPDF()}>Export to PDF </Button>
      </Container>
    )
  }
}

export default App
