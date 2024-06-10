import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ListsContextProvider } from './context/ListsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ListsContextProvider>
    <App />
  </ListsContextProvider>
)
