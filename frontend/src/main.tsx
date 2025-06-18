import './index.css'

// import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from './components/ui/toaster'
import { ThemeProvider } from './contexts/theme'
import AppRouter from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
   // <React.StrictMode>
   <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
         <AppRouter />
         <Toaster />
      </ThemeProvider>
   </QueryClientProvider>

   // </React.StrictMode>
)
