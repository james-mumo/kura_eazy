import React, { useContext, useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import apiList from "../lib/apiList"
import { useNavigate } from "react-router-dom"
import checkIsAuth from "../lib/isAuth"
import { appContext } from "../context/appContext"
import axios from "axios"
import Chip from "@mui/material/Chip"

const NewElectionDetails = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [startDateTime, setStartDateTime] = useState(new Date())
  const [endDateTime, setEndDateTime] = useState(new Date())

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")))
    setItemDetails({ ...itemDetails, itemAdmin: currentUser._id })
  }, [0])

  const [chips, setChips] = useState([])

  const handleAddChip = (event) => {
    if (event.key === "Enter" && event.target.value) {
      const newChip = event.target.value.trim()
      setChips([...chips, newChip])
      event.target.value = ""
    }
  }

  const handleDeleteChip = (chipToDelete) => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete))
  }

  const navigateTo = useNavigate()
  const {} = useContext(appContext)

  const [posViedItem, setPosViedItem] = useState("")
  const [itemDetails, setItemDetails] = useState({
    itemAdmin: currentUser?._id,
    itemType: "election",
    itemTitle: "",
    itemDesc: "",
    isNominations: false,
    candidates: [],
    positionsVied: [],
    startDate: startDateTime,
    endDate: endDateTime,
  })
  const [isError, setIsError] = useState(false)

  const handleInput = (value, key) => {
    setItemDetails({ ...itemDetails, [key]: value })
  }

  const handlePosViewd = () => {
    setItemDetails({
      ...itemDetails,
      positionsVied: [...itemDetails.positionsVied, posViedItem],
    })

    setPosViedItem("")
  }

  const handleItemSubmit = (e) => {
    e.preventDefault()
    setIsError(false)
    console.log(itemDetails)
    if (!(itemDetails.itemTitle || itemDetails.itemDesc)) {
      setIsError(true)
    } else {
      axios
        .post(apiList.addElection, itemDetails)
        .then((response) => {
          // console.log("Added Succesfully", response.data)
          if (response.status == 201) {
            localStorage.removeItem("electionItem")
            localStorage.setItem("electionItem", JSON.stringify(response.data))
            navigateTo("/candidates")
          }
        })
        .catch((error) => {
          console.error("Error adding new election:", error)
        })
    }
  }

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user"))?.email) {
      navigateTo("/auth")
    }
    console.log(checkIsAuth)
  }, [0])
  return (
    <div className="flex h-screen ">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-blue-800 bg-opacity-30 p-2">
          <div className="bg-blue-900 bg-opacity-70 py-3 text-white px-3 rounded-sm gap-2 flex flex-col justify-center w-full flex-1">
            <span className="text-[25px] font-bold">
              Create New Poll/Election
            </span>
            {/*  */}
            <div className="flex">
              <div className="flex gap-1 w-full">
                <label className="itemTitle text-[25px] opacity-90 font-semibold">
                  Type of Event
                </label>
                {/*  */}
                <div className="radioOptions flex flex-1 justify-start gap-3 items-center">
                  <div className="radioItem flex gap-1 cursor-pointer ml-5">
                    <input
                      className="text-[29px]"
                      type="radio"
                      value="election"
                      defaultChecked
                      onChange={(e) =>
                        setItemDetails({
                          ...itemDetails,
                          itemType: e.target.value,
                        })
                      }
                      name="itemType"
                    />
                    <span className="text-[24px]">Election</span>
                  </div>
                  <div className="radioItem flex gap-1 cursor-pointer">
                    <input
                      type="radio"
                      value="poll"
                      onChange={(e) =>
                        setItemDetails({
                          ...itemDetails,
                          itemType: e.target.value,
                        })
                      }
                      name="itemType"
                    />
                    <span className="text-[24px]">Poll</span>
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-3">
                <label className="itemTitle text-[25px] opacity-90 font-semibold">
                  Nominations Valid or Not
                </label>
                <select
                  onChange={(e) =>
                    setItemDetails({
                      ...itemDetails,
                      nominations: e.target.value,
                    })
                  }
                  name="nominations"
                  className="rounded-sm text-white text-lg px-3 bg-blue-500 placeholder-white focus:no-underline outline-none ">
                  <option className="py-2" value="true">
                    Add Nominations
                  </option>
                  <option className="py-2" value="false">
                    No Nominations
                  </option>
                </select>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col gap-1 w-full">
              <label className="itemTitle text-[25px] opacity-90 font-semibold">
                Title
              </label>
              <input
                name="itemTitle"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
                value={itemDetails.itemTitle}
                className=" flex-col-1 rounded-sm text-white text-lg px-3 bg-blue-500 placeholder-white focus:no-underline outline-none"
                type="text"
                placeholder="Enter Poll/Election Title"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="itemTitle text-[25px] opacity-90 font-semibold">
                Election Description
              </label>
              <input
                name="itemDesc"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
                value={itemDetails.itemDesc}
                className="flex-1 rounded-sm text-white text-lg px-3 bg-blue-500 placeholder-white focus:no-underline outline-none"
                type="text"
                placeholder="Enter additional information of the poll/election"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="itemTitle text-[25px] opacity-90 font-semibold">
                Start and End Date
              </label>
              <div className="flex gap-3">
                <div className="flex items-center gap-3 font-semibold">
                  <span>Start</span>
                  <input
                    type="datetime-local"
                    name="startDateTime"
                    id=""
                    min={new Date().toISOString().slice(0, 16)}
                    defaultValue={startDateTime.toISOString().slice(0, 16)}
                    onChange={(e) => {
                      // const date = new Date(e.target.value)
                      // const milliseconds = date.getTime()
                      // setStartDateTime(date)
                      // setStartDateTimeInMilliseconds(milliseconds)
                    }}
                    className="text-gray-300 font-semibold p-1 rounded-md bg-blue-500 "
                  />

                  {/* {new Date().toISOString()} */}
                </div>
                <div className="flex items-center gap-3 font-semibold">
                  <span>End</span>
                  <input
                    type="datetime-local"
                    name="endDateTime"
                    id=""
                    min={new Date().toISOString().slice(0, 16)}
                    defaultValue={endDateTime.toISOString().slice(0, 16)}
                    onChange={(e) => setEndDateTime(new Date(e.target.value))}
                    className="text-gray-300 font-semibold p-1 rounded-md bg-blue-500 "
                  />
                </div>
              </div>
            </div>
            {/*  */}

            {/*  */}

            {/* Positions */}
            <div className="flex flex-col">
              <span className="itemTitle text-[25px] opacity-90 font-semibold">
                Add Positions
              </span>
              <div className="flex ">
                <div className="flex">
                  <input
                    type="text"
                    value={posViedItem}
                    onChange={(e) => setPosViedItem(e.target.value)}
                    className="flex-1 text-white text-lg px-3 bg-blue-500 placeholder-white focus:no-underline outline-none"
                  />
                  <button
                    onClick={handlePosViewd}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                    Submit
                  </button>
                </div>

                <div className="flex">
                  {itemDetails?.positionsVied?.map((pos, id) => (
                    <span
                      className="bg-blue-800 min-w-[90px] text-center justify-center mx-1 flex items-center px-1 rounded-md border border-blue-700"
                      key={id}>
                      {pos}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleItemSubmit}
              className="bg-blue-600 cursor-pointer hover:bg-blue-800 text-white-800 font-semibold py-2 px-4 border border-blue-400 rounded shadow">
              Create
            </button>

            {/*  */}

            <div>
              <input
                type="text"
                placeholder="Type and press Enter"
                onKeyPress={handleAddChip}
              />
              {chips.map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  onDelete={() => handleDeleteChip(chip)}
                />
              ))}
            </div>

            {/*  */}
            {isError && (
              <span className="bg-blue-600 text-[13px] w-fit mx-auto cursor-pointer hover:bg-blue-800 text-white-800 font-semibold py-0 px-4 border border-blue-400 rounded shadow">
                Please Enter All Details
              </span>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default NewElectionDetails
