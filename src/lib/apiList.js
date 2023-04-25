export const server = "http://localhost:5000"

const apiList = {
  login: `${server}/api/user/auth/login`,
  register: `${server}/api/user/auth/signup`,
  userProfileData: `${server}/api/user/profile`,

  addVoters: `${server}/api/voter/addvoters`,
  getVoters: `${server}/api/voter/voters`,
  updateVoter: `${server}/api/voter/update`,

  getCandidates: `${server}/api/candidates/`,
  addCandidates: `${server}/api/candidates/add`,
  getNominations: `${server}/api/candidates/nominations`,
  addNominations: `${server}/api/candidates/addnominations`,

  addElection: `${server}/api/election/add`,
  getElection: `${server}/api/election/`,
}

export default apiList
