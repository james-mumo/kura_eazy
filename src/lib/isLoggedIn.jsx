import { useState, useEffect } from "react"

export function useToken() {
  const [token, setToken] = useState("")

  useEffect(() => {
    const storedToken = localStorage.getItem("loggedIn")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const saveToken = (inputToken) => {
    localStorage.setItem("loggedIn", inputToken)
    setToken(inputToken)
  }

  const removeToken = () => {
    localStorage.removeItem("loggedIn")
    setToken("")
  }

  return [token, saveToken, removeToken]
}
