import { createContext, useState, useEffect } from 'react'
import { CheckSession } from '../../services/Auth'
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
