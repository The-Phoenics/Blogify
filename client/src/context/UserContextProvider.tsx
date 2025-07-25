import React, { useEffect, useState } from 'react'
import { IUser } from '../types/types'
import UserContext from './UserContext'

const UserContextProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchUser = async () => {
    if (!isLoading) {
      setIsLoading(true)
      const reqUrl = `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/user/logged`
      console.log(reqUrl)
      const res = await fetch(reqUrl, {
        credentials: 'include',
      })
      console.log(res)
      if (res.ok) {
        const result = await res.json()
        if (result._id) {
          setUser(result)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
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
