import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HomeStateProvider } from "./components/context/HomeStateContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <HomeStateProvider>
        <App />
      </HomeStateProvider>
  </StrictMode>,
)
