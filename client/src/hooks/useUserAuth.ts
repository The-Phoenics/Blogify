import { UserContext } from '@/context/UserContext'
import { useContext } from 'react'

const useUserAuth = () => {
  const userContext = useContext(UserContext)
  if (!userContext) {
    throw 'Context must be used within a provider.'
  }
  const { isLoading, user, setUser } = userContext
  return { isLoading, user, setUser }
}

export default useUserAuth
