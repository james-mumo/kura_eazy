import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  console.log(isAuthenticated)
  // if (isAuthenticated != true) {
  //   return <Navigate to="/auth" state={{ from: location }} replace />
  // }
  return isAuthenticated ? (
    <>
      <div className="flex h-screen ">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-y-auto bg-blue-800 bg-opacity-30 p-2">
            {children}
          </main>
        </div>
      </div>
    </>
  ) : (
    <>
      <Navigate to="/auth" />
    </>
  )
}

export default ProtectedRoute
