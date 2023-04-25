// userReducer.js
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"

export const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        isLoggedIn: true,
        user: action.payload,
      }
    case LOGOUT_USER:
      return {
        isLoggedIn: false,
        user: null,
      }
    default:
      return state
  }
}
