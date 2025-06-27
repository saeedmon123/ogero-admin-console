import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import ErrorBoundary from './componenets/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
       <Toaster position="top-right" richColors /> 
       <ErrorBoundary> 
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
