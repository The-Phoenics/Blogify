import React, { Dispatch, useEffect, useState } from 'react'
import { IUser } from '../types/types'

interface UserContextType {
  user: IUser | null
  setUser: Dispatch<IUser | null>
  isLoading: boolean
}

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoading: false,
})

const UserContextProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchUser = async () => {
    if (!isLoading) {
      setIsLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/user/logged`, {
        credentials: 'include',
      })
      if (res.ok) {
        const result = await res.json()
        if (result._id) {
          setUser(result)
        } else {
          setUser(null)
        }
      }
      setIsLoading(false)
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
        isLoading: isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
