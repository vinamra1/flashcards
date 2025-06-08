import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { StudySessionProvider } from './context/StudySessionContext';
import { StatsProvider } from './context/StatsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StudySessionProvider>
      <StatsProvider>
        <App />
      </StatsProvider>
    </StudySessionProvider>
  </React.StrictMode>,
) 