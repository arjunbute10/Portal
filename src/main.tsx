import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.scss'
import MyThemeProvider from './layout/MyThemeProvider.tsx'

import YupConfig from './util/YupConfig.tsx'
import { AuthProvider } from './util/auth/AuthProvider.tsx'
import { SnackbarProvider } from './util/useSnackbar.tsx'
import { ApiProvider } from './util/fetch/ApiProvider.tsx'
import { UserProvider } from './util/auth/UserInfoProvider.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <YupConfig>
              <MyThemeProvider>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </MyThemeProvider>
            </YupConfig>
          </UserProvider>
        </AuthProvider>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
