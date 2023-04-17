import React from "react"

const ShowCounter = ({ days, hours, mins, secs }) => {
  return (
    <div className="flex border rounded-md w-fit p-3 border-blue-800 gap-3">
      <div className="flex gap-2">
        <label className="font-semibold" htmlFor="days">
          Days
        </label>
        <span className="opacity-90">{days}</span>
      </div>
      <div className="flex gap-2">
        <label className="font-semibold" htmlFor="days">
          Hours
        </label>
        <span className="opacity-90">{hours}</span>
      </div>
      <div className="flex gap-2">
        <label className="font-semibold" htmlFor="days">
          Minutes
        </label>
        <span className="opacity-90">{mins}</span>
      </div>
      <div className="flex gap-2">
        <label className="font-semibold" htmlFor="days">
          Seconds
        </label>
        <span className="opacity-90">{secs}</span>
      </div>
    </div>
  )
}

export default ShowCounter
