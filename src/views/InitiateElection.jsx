import React, { useEffect, useState } from "react"
import apiList from "../lib/apiList"
import axios from "axios"
import useElectionDetails from "../logic/useElectionDetails"
import useGetCandidates from "../logic/useGetCandidates"

const InitiateElection = () => {
  const electionDetails = useElectionDetails()
  const verifiedCandidates = useGetCandidates()

  useEffect(() => {}, [electionDetails])
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col">
          <span className="flex gap-2">
            <label htmlFor="">Election Type</label>
            <span>{electionDetails.itemType}</span>
          </span>
          <span className="flex gap-2">
            <label htmlFor="">Election Title</label>
            <span>{electionDetails.itemTitle}</span>
          </span>
          <span className="flex gap-2">
            <label htmlFor="">Election Desc</label>
            <span>{electionDetails.itemDesc}</span>
          </span>
        </div>

        {/*  */}

        {/*  */}
        <div className="flex flex-col">
          <h3>all Position and Approved Candidates</h3>
          <nav>
            <span>MP</span>
            {verifiedCandidates.length}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default InitiateElection
