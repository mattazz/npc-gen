import React from 'react'
import reactLogo from './assets/react.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import './App.css'
import * as db from './db.js'
import {Configuration, OpenAIApi} from 'openai'

const config = new Configuration({
  organization: 'org-YqkSoqf18JKiZxGkdJpc0NSW',
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
})

const openai = new OpenAIApi(config);



function App() {
  return (
    <div className="App">
      <ProfileCard />
    </div>
  )
}

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: db.fName[this.randomNum(0,db.fName.length)] + ' ' + db.lName[this.randomNum(0,db.lName.length)],
      age: this.randomNum(18, 100),
      class: db.classRPG[this.randomNum(0,db.classRPG.length)],
      history: '',
      archetype: db.archetype[this.randomNum(0,db.archetype.length)],
      quirks: [db.quirks[this.randomNum(0,db.quirks.length)], db.quirks[this.randomNum(0,db.quirks.length)], db.quirks[this.randomNum(0,db.quirks.length)]].join(', '),
      image: 'https://phoenixdex.alteredorigin.net/images/characters/character-placeholder.png'
    }
  }

  generateHistory(max_tokens){
    console.log('Generating history for: ' + this.state.name + ' who is a ' + this.state.quirks + ' '+ this.state.archetype + ' ' + this.state.class + ' and ' + this.state.age + ' years old.')
    this.setState({history: 'Generating history...'})
    openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a background history for a fantasy character named ${this.state.name} who is a ${this.state.quirks} ${this.state.class} and ${this.state.age} years old.
      This character is a ${this.state.archetype}. Generate this in html format with <p> tags and <h2> as titles for each notable moment in his history.`,
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
      prompt: `Generate a realistic fantasy portrait of a ${this.state.quirks} ${this.state.class} named ${this.state.name} who is ${this.state.age} years old. This character is dresed as a fantasy ${this.state.archetype} ${this.state.class}.`,
      n: 1,
      size: '256x256'
    }).then((response) => {
      console.log(response.data)
      this.setState({image: response.data.data[0].url})
      console.log(this.state.image)
      return response.data.images[0]
    })
  }

  randomNum(min, max){
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }
  render(){
    return(
      <Container fluid className=' bg-black text-white rounded-2 p-5'>
        <img className=' charImage rounded-3 p-4' src={this.state.image} alt='' />
        <h1>Name: {this.state.name}</h1>
        <h3>Age: {this.state.age}</h3>
        <h3>Class: {this.state.class}</h3>
        <h3>Archetype: {this.state.archetype}</h3>
        <h3>Quirks: {this.state.quirks}</h3>
        <h3>History:</h3>
        <hr />
        <div dangerouslySetInnerHTML={{__html: this.state.history}} />
        <Button variant="light" onClick={() => this.generateHistory(400)}>
          Generate History
        </Button>
        <Button className=' d-block mt-2' variant="light" onClick={() => this.generateImage()}>Generate Image </Button>
      </Container>
    )
  }
}

export default App
