import React from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import ViewAsVoterTopCard from "../components/ViewAsVoterTopCard"

const ViewAsVoter = () => {
  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-900 to-blue-600">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-gray-100">
          <ViewAsVoterTopCard />
        </main>
      </div>
    </div>
  )
}

export default ViewAsVoter
