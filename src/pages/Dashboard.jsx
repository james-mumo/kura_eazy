import React from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import DashboardTop from "../components/DashboardTop"

const Dashboard = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-blue-800 bg-opacity-30 p-2">
      <div className="bg-blue-900 bg-opacity-70 py-3 text-white px-3 rounded-sm gap-2 flex flex-col justify-center w-full flex-1">
        <DashboardTop />
      </div>
    </main>
  )
}

export default Dashboard
