import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { appContext } from "../context/appContext"
import apiList from "../lib/apiList"

const ViewAsVoterTopCard = () => {
  const { state, handleUpdateVoter } = useContext(appContext)

  const [voters, setVoters] = useState([])
  const [viewAllVoters, setViewAllVoters] = useState(true)
  const [viewVoter, setViewVoter] = useState({})

  const [isTokenGenerated, setIsTokenGenerated] = useState(false)
  const [idError, setIdError] = useState(false)
  const [updatedVoter, setUpdatedVoter] = useState({})
  const [userEnteredId, setUserEnteredId] = useState("")
  const [viewToken, setViewToken] = useState(false)
  const [generatedToken, setGeneratedToken] = useState("")

  function handleAddView(index) {
    setViewVoter(voters[index])
    setGeneratedToken("")
    setUserEnteredId("")
    setViewToken(false)
    setIsTokenGenerated(false)
  }

  function handleClick(viewVoter) {
    const enteredId = userEnteredId.trim()
    const voterId = viewVoter.voterID.trim()

    setGeneratedToken("")

    if (enteredId === voterId) {
      const randomNumber = Math.floor(100000 + Math.random() * 900000)
      setGeneratedToken(randomNumber)
      setViewToken(true)
      setIsTokenGenerated(true)
      const updatedVoter = { ...viewVoter, votingToken: randomNumber }
      setUpdatedVoter(updatedVoter)
      handleUpdateVoter(updatedVoter)
      setUserEnteredId("")
    } else {
      setIdError(true)
      setUserEnteredId("")
    }
  }

  useEffect(() => {}, [updatedVoter])

  function handleIdInput(e) {
    setUserEnteredId(e.target.value)
  }

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get(apiList.getVoters)
        setVoters(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchVoters()
  }, [voters])

  useEffect(() => {})

  return (
    <div className="flex-col flex w-full">
      <span>The Token You Used Is For "The Bigg Liitle Demo Election"</span>
      <div className="flex flex-col">
        <span>View Election Details</span>
        {voters?.length}
        <div className="flex">
          <button className="mx-auto w-fit inline-flex items-center px-4 py-2 my-2 bg-teal-700 hover:bg-teal-900 text-sm text-white font-bold rounded-sm cursor-pointer">
            View Candidates
          </button>
          <button className="mx-auto w-fit inline-flex items-center px-4 py-2 my-2 bg-teal-700 hover:bg-teal-900 text-sm text-white font-bold rounded-sm cursor-pointer">
            View All Nominations
          </button>
          <button className="mx-auto w-fit inline-flex items-center px-4 py-2 my-2 bg-teal-700 hover:bg-teal-900 text-sm text-white font-bold rounded-sm cursor-pointer">
            View Registered Users {voters.length}
          </button>
        </div>
        {viewAllVoters && (
          <div className="flex">
            <div className="max-h-96 overflow-y-scroll overflow-x-hidden mt-3 w-fit p-2 border border-red-300">
              {voters?.length > 0
                ? voters?.map((voter, index) => (
                    <div
                      onClick={() => handleAddView(index)}
                      className="mb-4 flex flex-col justify-center items-center border-b pb-3"
                      key={index}>
                      <div className="flex w-full px-3 items-center">
                        <label className="mr-1 text-sm" htmlFor="item">
                          Full Name :
                        </label>
                        <input
                          disabled
                          className="font-semibold opacity-90"
                          type="text"
                          placeholder="Unit Code"
                          value={voter.fullName}
                          onChange={(e) => {
                            const newUnits = [...units]
                            voters[index].fullName = e.target.value
                            setUnits(newUnits)
                          }}
                        />
                      </div>

                      <div className="flex w-full px-3 items-center">
                        <label className="mr-1 text-sm" htmlFor="item">
                          Location :
                        </label>
                        <input
                          disabled
                          className="font-semibold opacity-90"
                          type="text"
                          placeholder="Unit Code"
                          value={voter.regLocation}
                          onChange={(e) => {
                            const newUnits = [...units]
                            voters[index].regLocation = e.target.value
                            setUnits(newUnits)
                          }}
                        />
                      </div>
                      <div className="flex w-full px-3 items-center">
                        <label className="mr-1 text-sm" htmlFor="item">
                          Sex :
                        </label>
                        <input
                          disabled
                          className="font-semibold opacity-90"
                          type="text"
                          placeholder="Unit Code"
                          value={voter.sex}
                          onChange={(e) => {
                            const newUnits = [...units]
                            voters[index].sex = e.target.value
                            setUnits(newUnits)
                          }}
                        />
                      </div>
                      <div className="flex w-full px-3 items-center">
                        <label className="mr-1 text-sm" htmlFor="item">
                          Age :
                        </label>
                        <input
                          disabled
                          className="font-semibold opacity-90"
                          type="text"
                          placeholder="Unit Code"
                          value={voter.age}
                          onChange={(e) => {
                            const newUnits = [...units]
                            voters[index].age = e.target.value
                            setUnits(newUnits)
                          }}
                        />
                      </div>
                      <div className="flex w-full px-3 items-center">
                        <label className="mr-1 text-sm" htmlFor="item">
                          Added On :
                        </label>
                        <input
                          disabled
                          className="font-semibold opacity-90"
                          type="text"
                          placeholder="Unit Code"
                          value={new Date(voter.createdAt).toLocaleString()}
                        />
                      </div>
                      <div className="flex w-full px-3 items-center">
                        <label className="mr-1 text-sm" htmlFor="item">
                          Vote Token :
                        </label>
                        {voter.votingToken > 0 ? (
                          <span>Already</span>
                        ) : (
                          <span>Click To Generate</span>
                        )}
                      </div>
                    </div>
                  ))
                : "Loading"}
            </div>

            {/* single item view */}

            {viewVoter._id ? (
              <>
                <div className="flex flex-col gap-1 text-white w-72 px-3 items-center bg-teal-700 p-3 rounded-lg">
                  <img
                    src={viewVoter?.imgUrl}
                    alt=""
                    className="h-[160px] w-[160px] rounded-lg items-center border "
                  />
                  <div className="flex gap-2">
                    Full Name
                    <span className="font-semibold">{viewVoter?.fullName}</span>
                  </div>
                  <div className="flex gap-2">
                    ID
                    <span className="font-semibold cursor-no-drop">
                      {/* {viewVoter?.id ?.id} */}
                      Hidden
                    </span>
                  </div>
                  <div className="flex gap-2">
                    Registering Location
                    <span className="font-semibold">
                      {viewVoter?.regLocation}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    Sex
                    <span className="font-semibold">{viewVoter?.sex}</span>
                  </div>
                  <div className="flex gap-2">
                    Age
                    <span className="font-semibold">{viewVoter?.age}</span>
                  </div>
                  <div className="flex gap-2">
                    Added On
                    <span className="font-semibold">
                      {new Date(viewVoter?.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {viewVoter?.votingToken > 0 ? (
                    ""
                  ) : (
                    <div
                      className={
                        !idError
                          ? "flex flex-col gap-0 text-sm border justify-center items-center border-teal-900 p-1 w-full rounded-xl cursor-pointer font-semibold bg-teal-800"
                          : "flex flex-col gap-0 text-sm border justify-center items-center border-red-800 p-1 w-full rounded-xl cursor-pointer font-semibold bg-red-800"
                      }>
                      {!isTokenGenerated && (
                        <>
                          <span>
                            {!idError
                              ? "Enter ID To Generate"
                              : "Please Enter Your ID"}
                          </span>
                          <input
                            className="text-green-900"
                            type="text"
                            value={userEnteredId}
                            onChange={(e) =>
                              handleIdInput(e, userEnteredId, viewVoter)
                            }
                          />
                          <span onClick={() => handleClick(viewVoter)}>
                            Generate
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {viewToken && (
                    <>
                      <div className="span">Copy Token</div>
                      <span>{generatedToken}</span>
                    </>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewAsVoterTopCard
