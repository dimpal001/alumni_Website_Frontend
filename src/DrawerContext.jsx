// DrawerContext.js
import { createContext, useContext, useState } from 'react'

const DrawerContext = createContext()

const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

const useDrawer = () => {
  return useContext(DrawerContext)
}

export { DrawerProvider, useDrawer }
