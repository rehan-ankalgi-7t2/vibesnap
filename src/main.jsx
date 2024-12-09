import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.jsx'
import { ThemeProvider } from '@mui/material'
import theme from './theme/globalTheme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes}/>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
