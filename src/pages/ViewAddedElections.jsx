import React from "react"
import CreateTimeTableMain from "../components/CreateTimeTableMain"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function ViewAddedElections() {
  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-900 to-blue-600">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-gray-100">
          <CreateTimeTableMain />
        </main>
      </div>
    </div>
  )
}

export default ViewAddedElections
