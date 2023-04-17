import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Sidebar() {
  const [currentUser, setCurrentUser] = useState({})
  const [showModal, setShowModal] = useState(false)

  function handleAddUnitsClick() {
    setShowModal(true)
  }

  function handleAddLecturersClick() {
    setShowModal(true)
  }

  function handleModalClose() {
    setShowModal(false)
  }

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")))
  }, [0])

  return (
    <aside className="bg-blue-900 text-blue-100 w-64 space-y-6 px-2 py-5 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <div className="text-lg font-bold text-white pb-3">
          <Link to="/" className="text-white text-[28px] hover:text-gray-300">
            CSP TimeTabler
          </Link>
        </div>
        {/*  */}
        <a
          href="#"
          className="flex gap-2 py-2.5 px-4 rounded transition duration-200  hover:text-white"
          onClick={handleAddUnitsClick}>
          <img
            src="./public/eazy.jpg"
            alt=""
            className="h-[50px] w-[50px] rounded-lg items-center border "
          />
          <span className="flex flex-col gap-0">
            <span className="font-semibold">James Mumo</span>
            <span className="flex font-semibold text-green-400 justify-start items-center gap-1">
              <span className="h-3 w-3 bg-green-600 rounded-full"></span>
              <span>Online</span>
            </span>
          </span>
        </a>
        {/*  */}
        <span className="bg-blue-700 my-2 block px-4 font-semibold py-0 flex-1 w-full">
          View
        </span>
        <Link to="/dashboard">
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
            Dashboard
          </span>
        </Link>
        <Link to="/votes">
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
            Votes
          </span>
        </Link>

        {/*  */}

        <span className="bg-blue-700 my-2 block px-4 font-semibold py-0 flex-1 w-full">
          Manage
        </span>

        <Link to="/create">
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
            Create New
          </span>
        </Link>
        <Link to="/candidates">
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
            Candidates
          </span>
        </Link>
        <Link to="/voters">
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
            Voters
          </span>
        </Link>

        <Link to="/initiate">
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
            Initiate Election
          </span>
        </Link>
        {/*  */}

        <span className="bg-blue-700 block my-2 px-4 font-semibold py-0 flex-1 w-full">
          Profile
        </span>

        <Link to="#">
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
            Initiate Election
          </span>
        </Link>
        {/*  */}
        <span className="bg-blue-700 block my-2 px-4 font-semibold py-0 flex-1 w-full">
          Other Function Pages
        </span>

        <Link to="/voters">
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
            Voters
          </span>
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
