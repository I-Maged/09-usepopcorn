import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Geolocate from './Geolocate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Geolocate />
  </StrictMode>,
)
