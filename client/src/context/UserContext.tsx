import React, { useEffect, useState } from 'react'
import { IUser } from '../types/types'

export const UserContext = React.createContext(undefined)

const UserContextProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const fetchUser = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/user/logged`, {
      credentials: 'include',
    })
    if (res.ok) {
      const user = await res.json()
      if (user._id) {
        setUser(user)
        setIsLoggedIn(true)
      } else {
        setUser(null)
      }
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
