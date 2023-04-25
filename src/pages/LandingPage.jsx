import React from "react"
import UnAuthHeader from "../components/UnAuthHeader"
import { TypeAnimation } from "react-type-animation"

function LandingPage() {
  return (
    <div className="flex flex-col h-screen">
      <UnAuthHeader />
      <div className=" bg-gradient-to-r from-blue-400 to-blue-600 flex flex-col justify-center items-center flex-1">
        <h1 className="text-5xl font-bold text-white mb-8">
          <TypeAnimation
            sequence={[
              "E-voting: fast, easy, and convenient!",
              1000,
              "Say goodbye to long lines and confusing ballots!",
              1000,
              "Say goodbye to long lines and confusing ballots with our user-friendly e-voting platform!",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </h1>
      </div>
    </div>
  )
}

export default LandingPage
