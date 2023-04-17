import React from "react"
import UnAuthHeader from "../components/UnAuthHeader"

function LandingPage() {
  return (
    <div className="flex flex-col h-screen">
      <UnAuthHeader />
      <div className=" bg-gradient-to-r from-blue-400 to-blue-600 flex flex-col justify-center items-center flex-1">
        <h1 className="text-5xl font-bold text-white mb-8">
          You'll Never Vote Like Before
        </h1>
      </div>
    </div>
  )
}

export default LandingPage
