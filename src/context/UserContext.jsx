import { createContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('')
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
