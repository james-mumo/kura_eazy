import { appActions } from "./appActions"

export const appReducer = (state, action) => {
  switch (action.type) {
    //
    case appActions.AddSingleVoter:
      console.log(state)
      console.log(action.payload)
      return {
        ...state,
        allVoters: [...state?.allVoters, action.payload],
      }
    //
    case appActions.ImportVotersFromCSV:
      console.log("state", state.allVoters?.length)
      return {
        ...state,
        allVoters:
          state.allVoters?.length > 0
            ? [...state.allVoters, ...action.payload]
            : [...action.payload],
      }

    //

    case appActions.UpdateSingleVoter:
      console.log("single voter invoked")
      console.log(state)

      const updateVotersList = state.allVoters?.map((voter) =>
        voter.id === action.payload.id ? { ...action.payload } : voter
      )
      console.log("updateVotersList", updateVotersList)
      return {
        ...state,
        allVoters: updateVotersList,
      }

    default:
      return state
  }
}
