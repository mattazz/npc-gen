import React from 'react';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

// Import Css

export default function Card() {
  return (
    <Container fluid className='cardContainer'>
        <div className=''>
            <h1>Profile Card</h1>
            <h2>Name: </h2>
            <h2>Age: </h2>
        </div>
    </Container>
  );
}