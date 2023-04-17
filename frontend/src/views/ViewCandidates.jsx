import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { appContext } from "../context/appContext"
import apiList from "../lib/apiList"

const AddCandidates = () => {
  const [viewCandidate, setViewCandidate] = useState({})
  const [candidates, setCandidates] = useState([])
  const { handleCandidatesFileChanged } = useContext(appContext)

  function handleClick(index) {
    setViewCandidate(candidates[index])
    // console.log(viewCandidate)
  }

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(apiList.getCandidates)
        setCandidates(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCandidates()
  }, [candidates])

  return (
    <>
      <div className="flex flex-col">
        {/* add fromfile */}

        <label
          htmlFor="candidatesFileInput"
          className="inline-flex items-center w-fit px-4 py-2 bg-teal-700 hover:bg-teal-800 text-sm text-white font-bold rounded-full cursor-pointer">
          <span style={{ verticalAlign: "middle" }}>
            Add Candidates from CSV
          </span>
          <input
            id="candidatesFileInput"
            type="file"
            accept=".xlsx"
            className="hidden"
            onChange={handleCandidatesFileChanged}
          />
        </label>
        <div className="flex">
          {/* map them in a list */}
          <div className="max-h-96 overflow-y-scroll overflow-x-hidden mt-3 w-fit p-2 border border-red-300">
            {candidates.map((candidate, index) => (
              <div
                className="mb-4 flex flex-col text-white justify-center items-center border-b pb-3"
                key={index}>
                <div
                  onClick={() => handleClick(index)}
                  className="flex w-full px-3 items-center">
                  <label className="mr-1 text-sm" htmlFor="item">
                    Full Name :
                  </label>
                  <input
                    disabled
                    className="font-semibold opacity-90 bg-transparent"
                    type="text"
                    placeholder="Unit Code"
                    value={candidate.fullName}
                    onChange={(e) => {
                      const newUnits = [...units]
                      nominations[index].fullName = e.target.value
                      setUnits(newUnits)
                    }}
                  />
                </div>
                <div
                  onClick={() => handleClick(index)}
                  className="flex w-full px-3 items-center">
                  <label className="mr-1 text-sm" htmlFor="item">
                    ID :
                  </label>
                  <input
                    disabled
                    className="font-semibold opacity-90 bg-transparent"
                    type="text"
                    placeholder="Unit Code"
                    value={candidate.voterID}
                    onChange={(e) => {
                      const newUnits = [...units]
                      voters[index].id = e.target.value
                      setUnits(newUnits)
                    }}
                  />
                </div>
                <div
                  onClick={() => handleClick(index)}
                  className="flex w-full px-3 items-center">
                  <label className="mr-1 text-sm" htmlFor="item">
                    Location :
                  </label>
                  <input
                    disabled
                    className="font-semibold opacity-90 bg-transparent"
                    type="text"
                    placeholder="Unit Code"
                    value={candidate.regLocation}
                    onChange={(e) => {
                      const newUnits = [...units]
                      voters[index].regLocation = e.target.value
                      setUnits(newUnits)
                    }}
                  />
                </div>
                <div
                  onClick={() => handleClick(index)}
                  className="flex w-full px-3 items-center">
                  <label className="mr-1 text-sm" htmlFor="item">
                    Sex :
                  </label>
                  <input
                    disabled
                    className="font-semibold opacity-90 bg-transparent"
                    type="text"
                    placeholder="Unit Code"
                    value={candidate.sex}
                    onChange={(e) => {
                      const newUnits = [...units]
                      voters[index].sex = e.target.value
                      setUnits(newUnits)
                    }}
                  />
                </div>
                <div
                  onClick={() => handleClick(index)}
                  className="flex w-full px-3 items-center">
                  <label className="mr-1 text-sm" htmlFor="item">
                    Age :
                  </label>
                  <input
                    disabled
                    className="font-semibold opacity-90 bg-transparent"
                    type="text"
                    placeholder="Unit Code"
                    value={candidate.age}
                    onChange={(e) => {
                      const newUnits = [...units]
                      voters[index].age = e.target.value
                      setUnits(newUnits)
                    }}
                  />
                </div>
                <div
                  onClick={() => handleClick(index)}
                  className="flex w-full px-3 items-center">
                  <label className="mr-1 text-sm" htmlFor="item">
                    Added On :
                  </label>
                  <input
                    disabled
                    className="font-semibold opacity-90 bg-transparent"
                    type="text"
                    placeholder="Unit Code"
                    value={new Date(candidate.createdAt).toLocaleString()}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* sideview on click */}
          {viewCandidate?.imgUrl ? (
            <>
              <div className="flex gap-2 flex-1 text-white w-72 px-3 items-center bg-teal-700 p-3 rounded-lg">
                <div className="flex-col">
                  <img
                    src={viewCandidate.imgUrl}
                    alt=""
                    className="h-[160px] w-[160px] rounded-lg items-center border"
                  />
                  <div className="flex-col flex gap-2 mt-2">
                    <span className="text-lg font-bold">
                      {viewCandidate.fullName}
                    </span>
                    <div className="flex items-center gap-2">
                      <img
                        src={viewCandidate.partyIconUrl}
                        alt=""
                        className="h-[30px] w-[30px] rounded-lg items-center border"
                      />
                      <span className="text-lg font-bold">
                        {viewCandidate.party}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-lg font-bold">
                    Position: {viewCandidate.positionVied}
                  </span>
                  <span className="text-lg font-bold">
                    Region: {viewCandidate.regLocation}
                  </span>
                  <span className="text-lg font-bold">
                    Campaign Header: {viewCandidate.campaignHeader}
                  </span>
                  <span className="text-lg font-bold">
                    Main Agenda: {viewCandidate.campaignMainAgenda}
                  </span>
                </div>
                {/* // */}
                <div className="flex flex-col flex-1">
                  <span className="text-lg font-bold">Remove from Ballot</span>
                  <span className="text-lg font-bold">Edit Details</span>
                  <span className="text-lg font-bold">Disable</span>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {/* some charts */}
        </div>
      </div>
    </>
  )
}

export default AddCandidates
