import React from "react"
import { AppProvider } from "./context/appContext"
import { UserProvider } from "./context/user/userContext"
import Routes from "./router/Routes"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <UserProvider>
      <AppProvider>
        <ToastContainer />
        <Routes />
      </AppProvider>
    </UserProvider>
  )
}

export default App
