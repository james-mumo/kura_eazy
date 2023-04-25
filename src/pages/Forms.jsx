import React, { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UnAuthHeader from "../components/UnAuthHeader"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { ref, set } from "firebase/database"
import { setIsAuthenticated, setUserEmail } from "../context/slice"
import { useSelector, useDispatch } from "react-redux"
import { appAuth, firebaseDB } from "../firebase-config"

const Forms = () => {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()

  const [isLogin, setIsLogin] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    setIsError(false)

    if (isLogin) {
      try {
        const response = await signInWithEmailAndPassword(
          appAuth,
          formData.email,
          formData.password
        )

        if (response) {
          navigateTo("/dashboard")
          const userEmail = response.user.auth.currentUser.email
          console.log(userEmail)

          dispatch(setIsAuthenticated(true))
          dispatch(setUserEmail(formData.email))
        } else {
          setIsError(true)
        }
      } catch (error) {
        console.log(error.message)
        setIsError(true)
      }
    } else {
      try {
        const response = await createUserWithEmailAndPassword(
          appAuth,
          formData.email,
          formData.password
        )

        if (response) {
          const userEmail = response.user.auth.currentUser.email
          navigateTo("/dashboard")

          dispatch(setIsAuthenticated(true))
          dispatch(setUserEmail(formData.email))
          console.log(response)

          //adding to db
          set(ref(firebaseDB, "users/" + response.user.uid), {
            email: formData.email,
            password: formData.password,
          })
        } else {
          setIsError(!isError)
        }
      } catch (error) {
        console.log(error.message)
        setIsError(!isError)
        setErrorMessage(error.message)
      }
    }
  }

  useEffect(() => {
    let timeoutId

    if (isError) {
      timeoutId = setTimeout(() => {
        setIsError(false)
        setErrorMessage("")
      }, 5000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isError])

  return (
    <div className="flex flex-col w-full h-full">
      <UnAuthHeader />
      <div className="flex flex-col items-center justify-center  mx-auto w-full max-w-md p-4 bg-teal-900 rounded-md mt-4">
        <h1 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Sign up"}
        </h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4 ">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded text-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded text-gray-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>
        <p className="mt-4">
          {isLogin ? "Need to create an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLogin(!isLogin), () => setIsError(false)
            }}
            className="underline text-blue-500 ml-2">
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
        {isError && <span className="text-red-100">{errorMessage}</span>}
      </div>
    </div>
  )
}

export default Forms
