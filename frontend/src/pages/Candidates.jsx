import React, { useContext, useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import CandidatesTable from "../components/CandidatesTable"
import { toast } from "react-toastify"
import useGetCandidates from "../logic/useGetCandidates"
import axios from "axios"
import apiList from "../lib/apiList"
import { appContext } from "../context/appContext"
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"

const Candidates = () => {
  const getElectionCandidates = useGetCandidates()
  const { handleCandidatesFileChanged, candidates } = useContext(appContext)
  const [getCandidates, setGetCandidates] = useState([])

  const [addCandidate, setAddCandidate] = useState({
    fullName: "",
    voterID: "",
    regLocation: "",
    votingToken: 0,
    sex: "",
    age: "",
    imgUrl: "../public/pacart.jpg",
    positionVied: "",
    party: "",
    partyIconUrl: "../public/pacringcross.jpg",
    campaignHeader: "",
    campaignMainAgenda: "",
    electionContesting: "",
  })

  const [selectedRow, setSelectedRow] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const handleRowClick = (params) => {
    setSelectedRow(params.row)
    setOpenModal(true)
    setName(params.row.name)
    setAge(params.row.age)
    setEmail(params.row.email)
  }

  const handleModalClose = () => {
    setOpenModal(false)
    setSelectedRow(null)
    setName("")
    setAge("")
    setEmail("")
  }

  const handleUpdateRow = () => {
    const updatedRows = rows.map((row) => {
      if (row.id === selectedRow.id) {
        return {
          ...row,
          name,
          age,
          email,
        }
      }
      return row
    })
    setRows(updatedRows)
    handleModalClose()
  }

  function handleSuccess() {
    toast.success("Operation successful!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  function handleError() {
    toast.error("Operation failed!")
  }

  useEffect(() => {
    setGetCandidates(getElectionCandidates)
    console.log(getElectionCandidates)
  }, [candidates, getElectionCandidates, getCandidates])

  return (
    <>
      <div className="flex h-screen ">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-y-auto bg-blue-800 bg-opacity-30 p-2">
            <div className="bg-blue-900 bg-opacity-70 py-3 text-white px-3 rounded-sm gap-2 flex flex-col justify-center w-full flex-1">
              <span className="itemTitle text-[25px] opacity-90 font-semibold">
                Candidates
              </span>

              <div className="flex gap-2 ">
                <button
                  onClick={handleRowClick}
                  className="bg-blue-600 cursor-pointer hover:bg-blue-800 text-white-800 text-sm font-semibold py-1 px-4 border border-blue-400 rounded shadow">
                  Add New
                </button>

                <label
                  htmlFor="candidatesFileInput"
                  className="bg-blue-600 cursor-pointer hover:bg-blue-800 text-white-800 text-sm font-semibold py-1 px-4 border border-blue-400 rounded shadow">
                  <span style={{ verticalAlign: "middle" }}>
                    Add Candidates from Excell
                  </span>
                  <input
                    id="candidatesFileInput"
                    type="file"
                    accept=".xlsx"
                    className="hidden"
                    onChange={handleCandidatesFileChanged}
                  />
                </label>

                <div className="flex flex-1 justify-end">
                  <button className="bg-red-600 cursor-pointer hover:bg-red-800 text-white-800 text-sm font-semibold py-1 px-4 border border-red-400 rounded shadow">
                    Delete All
                  </button>
                </div>
              </div>

              {/* list and table */}
              <CandidatesTable rows={getCandidates} />
            </div>
          </main>
        </div>
      </div>
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Enter Candidate Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            value={addCandidate.fullName}
            onChange={(event) =>
              setAddCandidate({ ...addCandidate, fullName: event.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Voter ID"
            value={addCandidate.voterID}
            onChange={(event) =>
              setAddCandidate({ ...addCandidate, voterID: event.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Registering Location"
            value={addCandidate.regLocation}
            onChange={(event) =>
              setAddCandidate({
                ...addCandidate,
                regLocation: event.target.value,
              })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Sex"
            value={addCandidate.sex}
            onChange={(event) =>
              setAddCandidate({ ...addCandidate, sex: event.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Age"
            value={addCandidate.age}
            onChange={(event) =>
              setAddCandidate({ ...addCandidate, age: event.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Position Vied"
            value={addCandidate.positionVied}
            onChange={(event) =>
              setAddCandidate({
                ...addCandidate,
                positionVied: event.target.value,
              })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Party"
            value={addCandidate.party}
            onChange={(event) =>
              setAddCandidate({
                ...addCandidate,
                positionVied: event.target.value,
              })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Campaign Header"
            value={addCandidate.campaignHeader}
            onChange={(event) =>
              setAddCandidate({
                ...addCandidate,
                positionVied: event.target.value,
              })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button className="bg-blue-900" onClick={handleUpdateRow}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Candidates
