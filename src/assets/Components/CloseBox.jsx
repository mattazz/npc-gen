import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function CloseBox(props){
    return (
        <div className=' overflow-auto p-3' id='closeBox'> 
            <h1 className=' text-center'> Help Menu </h1>
            <hr />
            <div className=' text-start p-2'>
                <h3>Basics</h3>
                    <p> This is a simple app that uses OpenAI's Chat GPT to generate a random character. 
                        The character will be generated based on the options you select. </p>
                    <p>Sign up to OpenAI to get an API key <a href="https://openai.com/" target="_blank">here</a></p>
                <h3>Toggle custom fields</h3>
                    <p>You can toggle any of the fields and customize your character. The only field you can't edit *for now* is the quirks</p>
            </div>
        </div>
    )
}