import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { appContext } from "../context/appContext"
import userContext from "../context/user/userContext"
import { appAuth } from "../firebase-config"
import { useSelector, useDispatch } from "react-redux"
import { setIsAuthenticated, setUserEmail } from "../context/slice"

function Navbar() {
  const dispatch = useDispatch()

  const { state, voters } = useContext(appContext)
  const [currentUser, setCurrentUser] = useState({})

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  console.log(isAuthenticated)

  function handleLogout() {
    dispatch(setIsAuthenticated(false))
    dispatch(setUserEmail())
  }

  return (
    <nav
      className="bg-gradient-to-r from-blue-900 to-blue-600 flex justify-between items-center py-4 px-8 sticky top-0 z-10"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
      <div className="text-lg font-bold text-white">
        {/* <Link to="/" className="text-white hover:text-gray-300">
          CSP TimeTabler
        </Link> */}
      </div>
      {/*  */}
      <div className="flex space-x-4">
        <Link to="/create-poll" className="text-white hover:text-gray-300">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Poll
          </button>
        </Link>

        {isAuthenticated ? (
          <Link to="/auth" className="text-white hover:text-gray-300">
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </Link>
        ) : (
          <Link to="/auth" className="text-white hover:text-gray-300">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
