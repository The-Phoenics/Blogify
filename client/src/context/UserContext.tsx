import React, { Dispatch, useEffect, useState } from 'react'
import { IUser } from '../types/types'

interface UserContextType {
  user: IUser | null
  setUser: Dispatch<IUser> | null
}

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: null,
})

const UserContextProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState<IUser | null>(null)

  const fetchUser = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/user/logged`, {
      credentials: 'include',
    })
    if (res.ok) {
      const user = await res.json()
      if (user._id) {
        setUser(user)
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
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
