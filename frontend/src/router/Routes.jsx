import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import CreateElection from "../pages/CreateElection"
import ViewAddedElections from "../pages/ViewAddedElections"
import ViewAsVoter from "../pages/ViewAsVoter"
import Forms from "../pages/Forms"
import NewElectionDetails from "../pages/NewElectionDetails"
import CreatePollSurvey from "../pages/CreatePollSurvey"
import Dashboard from "../pages/Dashboard"
import NotFound from "../pages/NotFound"
import Candidates from "../pages/Candidates"
import Voters from "../pages/Voters"
import InitiateElection from "../pages/InitiateElection"

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* un-authentcated pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Forms />} />

        {/* authenticated pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<NewElectionDetails />} />
        <Route path="/create-election" element={<CreateElection />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/voters" element={<Voters />} />
        <Route path="/initiate" element={<InitiateElection />} />
        <Route path="/create-poll" element={<CreatePollSurvey />} />
        <Route path="/view-elections" element={<ViewAddedElections />} />
        <Route path="/view-as-voter" element={<ViewAsVoter />} />

        {/* other 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
