import axios from "axios"
import React, { useEffect, useState } from "react"
import apiList from "../lib/apiList"

const useGetCandidates = () => {
  const [candidates, setCandidates] = useState([])

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
  }, [0])
  return candidates
}

export default useGetCandidates
