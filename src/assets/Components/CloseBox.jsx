import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function CloseBox(props){
    return (
        <div className=' overflow-hidden p-3' id='closeBox'> 
            <h1 className=' text-center'> Help Menu </h1>
            <hr />
            <p> This is a simple app that uses OpenAI's GPT-3 API to generate a random character. </p>
            <p> The character will be generated based on the options you select. </p>
        </div>
    )
}