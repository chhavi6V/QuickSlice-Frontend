import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom"
import AppRoutes from './AppRoutes.jsx'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import {QueryClient, QueryClientProvider} from "react-query"
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient({
    defaultOptions : {
      queries: {
        refetchOnWindowFocus: false
      }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <SnackbarProvider maxSnack={1}>
          <AppRoutes/>
        </SnackbarProvider>
      </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
