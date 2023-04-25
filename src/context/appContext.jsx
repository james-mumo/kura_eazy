import { createContext, useEffect, useReducer, useState } from "react"
import { appActions } from "./appActions"
import { appReducer } from "./appReducer"
import * as XLSX from "xlsx"
import axios from "axios"
import apiList from "../lib/apiList"
import { useNavigate } from "react-router-dom"

export const appContext = createContext()

const initState = {
  allVoters: [],
}

export const AppProvider = ({ children }) => {
  const [showAddVotersView, setShowAddVotersView] = useState(true)
  const [voters, setVoters] = useState([])
  const [nominations, setNominations] = useState([])
  const [candidates, setCandidates] = useState([])

  const [state, dispatch] = useReducer(appReducer, initState)

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get(apiList.getVoters)
        setVoters(response.data)
      } catch (error) {
        // console.error(error)
      }
    }
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(apiList.getCandidates)
        setCandidates(response.data)
      } catch (error) {
        // console.error(error)
      }
    }
    fetchVoters()
    fetchCandidates()
    initState.allVoters = voters
  }, [])

  //

  function handleVoterFileChanged(event) {
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      const newVoters = rows.slice(1).map((row) => ({
        fullName: row[0],
        voterID: row[1],
        regLocation: row[2],
        votingToken: row[3] || 0,
        sex: row[4],
        age: row[5],
        imgUrl: "../public/vite.svg",
      }))

      setVoters([...voters, ...newVoters])
      dispatch({
        type: appActions.ImportVotersFromCSV,
        payload: newVoters,
      })

      // Add new voters to database
      axios
        .post(apiList.addVoters, newVoters)
        .then((response) => {
          console.log("New voters added successfully:", response.data)
        })
        .catch((error) => {
          console.error("Error adding new voters:", error)
        })
    }

    reader.readAsArrayBuffer(file)
  }
  function handleNomineeFileChanged(event) {
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      const newNominations = rows.slice(1).map((row) => ({
        fullName: row[0],
        voterID: row[1],
        regLocation: row[2],
        votingToken: row[3] || 0,
        sex: row[4],
        age: row[5],
        imgUrl: "../public/pacart.jpg",
        positionVied: row[6],
        party: row[7],
        partyIconUrl: "../public/pacringcross.jpg",
        campaignHeader: row[8],
        campaignMainAgenda: row[9],
      }))

      setNominations([...nominations, ...newNominations])

      // Add new voters to database
      axios
        .post(apiList.addNominations, newNominations)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error adding new nominations:", error)
        })
    }

    reader.readAsArrayBuffer(file)
  }
  function handleCandidatesFileChanged(event) {
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      const newCandidates = rows.slice(1).map((row) => ({
        fullName: row[0],
        voterID: row[1],
        regLocation: row[2],
        votingToken: row[3] || 0,
        sex: row[4],
        age: row[5],
        imgUrl: "../public/pacart.jpg",
        positionVied: row[6],
        party: row[7],
        partyIconUrl: "../public/pacringcross.jpg",
        campaignHeader: row[8],
        campaignMainAgenda: row[9],
        electionContesting: "642ee17b70ee60bf0a31bb05",
      }))

      setCandidates([...candidates, ...newCandidates])

      // Add new voters to database
      axios
        .post(apiList.addCandidates, newCandidates)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error adding new nominations:", error)
        })
    }

    reader.readAsArrayBuffer(file)
  }

  function handleUpdateVoter(item) {
    axios
      .put(apiList.updateVoter + ":" + item._id, item)
      .then((response) => {
        console.log("Voter updated sucessfully:", response.data)
      })
      .catch((error) => {
        console.error("Error adding new voters:", error)
      })
  }

  const values = {
    ...state,
    initState,
    voters,
    nominations,
    candidates,
    state,
    showAddVotersView,
    handleNomineeFileChanged,
    handleVoterFileChanged,
    handleUpdateVoter,
    handleCandidatesFileChanged,
  }
  return <appContext.Provider value={values}>{children}</appContext.Provider>
}
