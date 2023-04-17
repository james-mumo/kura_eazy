import React from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import InitElection from "../components/InitElection"

function InitiateElection() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-blue-800 bg-opacity-30 p-2">
          <div className="bg-blue-900 bg-opacity-70 py-3 text-white px-3 rounded-sm gap-2 flex flex-col justify-center w-full flex-1">
            <InitElection />
          </div>
        </main>
      </div>
    </div>
  )
}

export default InitiateElection
