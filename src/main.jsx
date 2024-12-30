import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router';
import { OtpProvider } from './context/otpContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OtpProvider>
      <BrowserRouter>
        <App />
        <ToastContainer autoClose={1500} />
      </BrowserRouter>
    </OtpProvider>
  </StrictMode>,
)
