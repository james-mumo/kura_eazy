import React, { useContext, useEffect, useState } from "react"
import { appContext } from "../context/appContext"
import ViewVoters from "../views/ViewVoters"
import AddElectionCard from "./AddElectionCard"
import ViewNominations from "../views/ViewNominations"
import InitiateElection from "../views/InitiateElection"
import ViewCandidates from "../views/ViewCandidates"
import apiList from "../lib/apiList"
import axios from "axios"
import useElectionDetails from "../logic/useElectionDetails"

const InitElection = () => {
  const getElectionDetails = useElectionDetails()
  const [electionDetails, setElectionDetails] = useState({})
  const [showAddElectionViewOption, setShowAddElectionViewOption] = useState({
    voters: false,
    nominations: false,
    candidates: false,
    initElection: true,
  })
  const {
    voters,
    nominationCandiates,
    nominations,
    candidates,
    electionCandidates,
  } = useContext(appContext)

  useEffect(() => {
    setElectionDetails(getElectionDetails)
    console.log(electionDetails)
  }, [electionDetails])

  return (
    <div className="flex flex-col">
      {/* <div className="flex">Select Election Stage</div> */}
      <div className="flex">
        <div className="grid grid-flow-col gap-2 border border-blue-700 rounded-sm w-full">
          {/* Elction Details */}
          {/*  */}
          {/*  */}
          <div onClick={nominationCandiates}>
            <div className="flex flex-col border bg-blue-700 text-white rounded-md p-2">
              <span className="w-full text-center font-bold text-lg">
                {getElectionDetails?.itemTitle}
              </span>
              <span className="w-full text-center">
                {getElectionDetails?.itemDesc}
              </span>
              <div className="flex w-full ml-3 text-[15px] gap-3">
                <label>Type</label>
                <span className="font-bold">
                  {getElectionDetails?.itemType}
                </span>
              </div>
              <div className="flex w-full ml-3 text-[15px] gap-3">
                <label>Nominations?</label>
                <span className="font-bold">
                  {getElectionDetails?.nominations == false
                    ? "Nominations need to be aded"
                    : "Not needed"}
                </span>
              </div>
              <div className="flex  w-full ml-3 text-[15px] gap-3">
                <span>Start Date</span>
                <span className="font-bold">
                  {getElectionDetails.startDate}
                </span>
              </div>
              <div className="flex  w-full ml-3 text-[15px] gap-3">
                <span>End Date</span>{" "}
                <span className="font-bold">{getElectionDetails.endDate}</span>
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
          {/* Voters */}
          <AddElectionCard
            handleClick={() =>
              setShowAddElectionViewOption({
                nominations: false,
                candidates: false,
                initElection: false,
                voters: !showAddElectionViewOption.voters,
              })
            }
            cardName={"Voters"}
            cardHeaderSpan={"Voters Added"}
            headerSpanNumber={voters?.length}
            cardBodySpan={
              "Voters with Tokens : " +
              voters.filter((voter) => voter.votingToken <= 0).length
            }
            cardBodyNumber={""}
            cardBtnText={voters?.length > 0 ? "View Voters" : "Add Voters"}
          />
          {/* Nomination */}

          {electionDetails?.nominations == "false" ? (
            ""
          ) : (
            <AddElectionCard
              handleClick={() =>
                setShowAddElectionViewOption({
                  voters: false,
                  candidates: false,
                  initElection: false,
                  nominations: !showAddElectionViewOption.nominations,
                })
              }
              cardName={"Nominations"}
              cardHeaderSpan={"Candidates Added For Nominates"}
              headerSpanNumber={0}
              cardBodySpan={"Approved Candidates || Ongoing"}
              cardBodyNumber={0}
              cardBtnText={"View/Add Nominations"}
            />
          )}
          <AddElectionCard
            handleClick={() =>
              setShowAddElectionViewOption({
                nominations: false,
                candidates: !showAddElectionViewOption.candidates,
                initElection: false,
                voters: false,
              })
            }
            cardName={"Candidates"}
            cardHeaderSpan={"Approved Candidates"}
            headerSpanNumber={candidates?.length}
            cardBodySpan={"Approved Candidates || Ongoing"}
            cardBodyNumber={0}
            cardBtnText={"View/Add Candidates"}
          />
          {/* Elections */}
          <AddElectionCard
            handleClick={() =>
              setShowAddElectionViewOption({
                nominations: false,
                candidates: false,
                initElection: true,
                voters: false,
              })
            }
            cardName={"Initiate Election"}
            cardHeaderSpan={"Candidates Added and Vetted"}
            headerSpanNumber={0}
            cardBodySpan={"Verified Voters "}
            cardBodyNumber={0}
            cardBtnText={"Initiate"}
          />
          {/* Polls */}
          {/* <AddElectionCard
            cardName={"Create Poll/Survey"}
            cardHeaderSpan={"Added Questions"}
            headerSpanNumber={0}
            cardBodySpan={"General or Specific"}
            cardBodyNumber={0}
            cardBtnText={"Add Nominations"}
          /> */}
        </div>
      </div>

      <div className="views mt-2 rounded-md p-2 border-teal-500 border min-h-[420px]">
        {showAddElectionViewOption.voters && <ViewVoters />}
        {showAddElectionViewOption.nominations && <ViewNominations />}
        {showAddElectionViewOption.candidates && <ViewCandidates />}
        {showAddElectionViewOption.initElection && <InitiateElection />}
      </div>
    </div>
  )
}

export default InitElection
