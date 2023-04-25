import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  userEmail: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload
    },
  },
})

export const { setIsAuthenticated, setUserEmail } = userSlice.actions

export default userSlice.reducer
