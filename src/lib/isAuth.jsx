let checkIsAuth
let userInfo

if (localStorage.getItem("user")) {
  checkIsAuth = true
  userInfo = JSON.parse(localStorage.getItem("user"))
} else {
  checkIsAuth = false
}

// export const userType = () => {
//   return localStorage.getItem("userType")
// }

export default checkIsAuth
export { userInfo }
