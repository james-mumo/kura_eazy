// UserContext.js
import { createContext, useReducer } from "react"
import { userReducer } from "./userReducer"

const userContext = createContext(null)

const initialState = {
  isLoggedIn: false,
  user: null,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const handleLogin = (user) => {
    dispatch({ type: "LOGIN_USER", payload: user })
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_USER" })
  }

  return (
    <userContext.Provider
      value={{ user: state.user, handleLogin, handleLogout }}>
      {children}
    </userContext.Provider>
  )
}

export default userContext
