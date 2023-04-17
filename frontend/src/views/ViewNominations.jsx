import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { appContext } from "../context/appContext"
import apiList from "../lib/apiList"

const AddNominations = () => {
  const [viewNominee, setViewNominee] = useState({})
  const [nominations, setNominations] = useState([])
  const { handleNomineeFileChanged } = useContext(appContext)

  function handleClick(index) {
    setViewNominee(nominations[index])
  }

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const response = await axios.get(apiList.getNominations)
        setNominations(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchNominees()
  }, [nominations])

  return (
    <>
      <div className="flex flex-col">
        {/* add fromfile */}

        <label
          htmlFor="votersFileInput"
          className="inline-flex items-center w-fit px-4 py-2 bg-teal-700 hover:bg-teal-800 text-sm text-white font-bold rounded-full cursor-pointer">
          <span style={{ verticalAlign: "middle" }}>Add Nominees from CSV</span>
          <input
            id="votersFileInput"
            type="file"
            accept=".xlsx"
            className="hidden"
            onChange={handleNomineeFileChanged}
          />
        </label>
        <div className="flex">
          {/* map them in a list */}
          <div className="max-h-96 overflow-y-scroll overflow-x-hidden mt-3 w-fit p-2 border border-red-300">
            {nominations.map((nominee, index) => (
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
                    value={nominee.fullName}
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
                    value={nominee.voterID}
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
                    value={nominee.regLocation}
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
                    value={nominee.sex}
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
                    value={nominee.age}
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
                    value={new Date(nominee.createdAt).toLocaleString()}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* sideview on click */}
          {viewNominee?.imgUrl ? (
            <>
              <div className="flex flex-col gap-2 text-white w-72 px-3 items-center bg-teal-700 p-3 rounded-lg">
                <img
                  src={viewNominee.imgUrl}
                  alt=""
                  className="h-[160px] w-[160px] rounded-lg items-center border "
                />
                <div className="flex gap-2">
                  Full Name
                  <span className="font-semibold">{viewNominee.fullName}</span>
                </div>
                <div className="flex gap-2">
                  ID
                  <span className="font-semibold">{viewNominee.voterID}</span>
                </div>
                <div className="flex gap-2">
                  Registering Location
                  <span className="font-semibold">
                    {viewNominee.regLocation}
                  </span>
                </div>
                <div className="flex gap-2">
                  Sex
                  <span className="font-semibold">{viewNominee.sex}</span>
                </div>
                <div className="flex gap-2">
                  Age
                  <span className="font-semibold">{viewNominee.age}</span>
                </div>
                <div className="flex gap-2">
                  Added On
                  <span className="font-semibold">
                    {new Date(viewNominee?.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {/* some charts */}
          some charts and otjer graphs viuselas
        </div>
      </div>
    </>
  )
}

export default AddNominations
