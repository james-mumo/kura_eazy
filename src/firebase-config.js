// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGh3Xui7VRSL92KvOyINqOpO1-a02_G8c",
  authDomain: "votewave-react-firebase.firebaseapp.com",
  projectId: "votewave-react-firebase",
  storageBucket: "votewave-react-firebase.appspot.com",
  messagingSenderId: "118347128550",
  appId: "1:118347128550:web:1c638414e2196928bde527",
  measurementId: "G-2LQMP6V10M",
}

// Initialize Firebase
const initApp = initializeApp(firebaseConfig)
const appAuth = getAuth(initApp)
const firebaseDB = getDatabase(initApp)

export default initApp
export { firebaseDB, appAuth }
