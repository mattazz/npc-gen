import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function CloseBox(props){
    return (
        <div className=' overflow-hidden p-3' id='closeBox'> 
            <h1 className=' text-center'> Help Menu </h1>
            <hr />
            <div className=' text-start p-2'>
                <p> This is a simple app that uses OpenAI's GPT-3 API to generate a random character. </p>
                <p> The character will be generated based on the options you select. </p>
                <p>Sign up to OpenAI to get an API key <a href="https://openai.com/" target="_blank">here</a></p>
            </div>
        </div>
    )
}