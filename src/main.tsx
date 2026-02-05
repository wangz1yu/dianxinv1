import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Handle GitHub Pages SPA routing
if (window.location.pathname.includes('/?/')) {
  const redirect = window.location.pathname.replace('/?/', '/').replace(/~and~/g, '&');
  window.history.replaceState(null, '', redirect + window.location.search + window.location.hash);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
