import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter  as Router, Route, Switch} from 'react-router-dom'
import App from './App'
import Header from './assets/Components/Header'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
        <App />
)
