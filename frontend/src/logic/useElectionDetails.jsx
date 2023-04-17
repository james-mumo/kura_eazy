import { useState, useEffect } from "react"
import axios from "axios"
import apiList from "../lib/apiList"

const useElectionDetails = () => {
  const [electionDetails, setElectionDetails] = useState({})

  useEffect(() => {
    function getElectionDetails() {
      let electionId = JSON.parse(localStorage.getItem("electionItem"))?._id

      axios
        .get(apiList.getElection + `${electionId}`)
        .then((res) => {
          setElectionDetails(res.data)
        })
        .catch((err) => console.log(err))
    }
    getElectionDetails()
  }, [])
  return electionDetails
}

export default useElectionDetails
