import axios from "axios"
import React, { useEffect, useState } from "react"
import apiList from "../lib/apiList"

const useGetVoters = () => {
  const [voters, setVoters] = useState([])

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get(apiList.getVoters)
        setVoters(response.data)
      } catch (error) {
        // console.error(error)
      }
    }
    fetchVoters()
  }, [0])
  return voters
}

export default useGetVoters
