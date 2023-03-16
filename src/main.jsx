import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import Header from './assets/Components/Header'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
        <StrictMode>
                 <HashRouter>
                         <App />
                </HashRouter>    
        </StrictMode>
)
