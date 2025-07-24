import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TrybeProvider } from './context/store.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <TrybeProvider>
    <App />
    </TrybeProvider>
    </BrowserRouter>
)
