import './index.css'

// import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from './components/ui/toaster'
import { ThemeProvider } from './contexts/theme'
import AppRouter from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
   // <React.StrictMode>
   <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <AppRouter />
      <Toaster />
   </ThemeProvider>
   // </React.StrictMode>
)
