import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster
      position="top-center"
      offset={24}
      style={{
        '--normal-bg': 'var(--color-base-100)',
        '--normal-text': 'var(--color-base-content)',
        '--normal-border': 'var(--color-base-300)',
        '--border-radius': 'var(--radius-box)',
      }}
      toastOptions={{
        classNames: {
          toast: 'font-sans shadow-md!',
          description: 'text-base-content/60!',
          success: '[&_[data-icon]]:text-primary',
          error: '[&_[data-icon]]:text-error',
        },
      }}
    />
  </BrowserRouter>,
)
