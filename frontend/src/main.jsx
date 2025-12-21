import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import UseContext from "./context/UseContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import SocketProvider from './context/SocketContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <SocketProvider>
      <CaptainContext>
        <UseContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UseContext>
      </CaptainContext>
  </SocketProvider>
  </StrictMode>
)
