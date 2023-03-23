import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'


export default function GenerateButtons(props) {
    return(
        <div>
          <Button className='btn customButtons me-2' variant="light" onClick={props.regenerateAll}> Generate again </Button>
          <Button className='btn customButtons d-block mt-2' variant="light" onClick={props.generateHistory} >
            Generate History
          </Button>
          <Button className='btn d-inline d-block mt-2 customButtons' variant="light" onClick={props.exportToPDF}>Export to PDF </Button>
        </div>
    )
}