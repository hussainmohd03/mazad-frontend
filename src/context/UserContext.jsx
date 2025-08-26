import { createContext, useState } from 'react'

export const UserContext = createContext(null)

export const UserProvide = ({ children }) => {
  const [user, setUser] = useState('')

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
