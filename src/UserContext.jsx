import { useState, createContext, useEffect } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const [content, setContent] = useState(() => {
    const storedContent = sessionStorage.getItem('content')
    return storedContent ? JSON.parse(storedContent) : null
  })

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'))
    if (storedUser) {
      setUser(storedUser)
    }

    const storedContent = JSON.parse(sessionStorage.getItem('content'))
    if (storedContent) {
      setContent(storedContent)
    }
  }, [])

  const updateContent = (newContent) => {
    sessionStorage.setItem('content', JSON.stringify(newContent))
    setContent(newContent)
  }

  return (
    <UserContext.Provider value={{ user, setUser, content, updateContent }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
