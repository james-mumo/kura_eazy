import React from "react"
import { AppProvider } from "./context/appContext"
import { UserProvider } from "./context/user/userContext"
import Routes from "./router/Routes"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Provider } from "react-redux"
import store from "./context/store"

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <AppProvider>
          <ToastContainer />
          <Routes />
        </AppProvider>
      </UserProvider>
    </Provider>
  )
}

export default App
