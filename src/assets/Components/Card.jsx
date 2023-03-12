import React from 'react';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

// Import Css

export default function Card(props) {
  return (
    <Container fluid className='cardContainer text-center'>
        <div className=' bg-light p-5 w-25 rounded-3 m-auto text-black text-start'>
            <h1>Profile Card</h1>
            <hr />
            <h2>{props.name}</h2>
            <h4>{props.age} Years Old </h4>
            <h4>{props.class}</h4>
            <h4>{props.race}</h4>
            <h4>{props.archetype}</h4>
        </div>
    </Container>
  );
}