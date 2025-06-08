import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StudySessionProvider } from './context/StudySessionContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StudySessionProvider>
      <App />
    </StudySessionProvider>
  </React.StrictMode>,
) 