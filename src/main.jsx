import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from './UserContext.jsx'
import { DrawerProvider } from './DrawerContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <DrawerProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </DrawerProvider>
    </ChakraProvider>
  </React.StrictMode>
)
