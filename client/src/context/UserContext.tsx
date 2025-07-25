import { IUser } from "@/types/types"
import { Dispatch, createContext } from "react"

interface UserContextType {
  user: IUser | null
  setUser: Dispatch<IUser | null>
  isLoading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoading: false,
})

export default UserContext