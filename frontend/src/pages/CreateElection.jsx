import React from "react"
import AddElection from "../components/InitElection"
import CreateTimeTableMain from "../components/CreateTimeTableMain"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function CreateTimetable() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          {/* <CreateTimeTableMain /> */}
          <AddElection />
        </main>
      </div>
    </div>
  )
}

export default CreateTimetable
