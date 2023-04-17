import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import UnAuthHeader from "../components/UnAuthHeader"
import apiList from "../lib/apiList"
import userContext from "../context/user/userContext"

const Forms = () => {
  const navigateTo = useNavigate()
  const { handleLogin } = useContext(userContext)
  const [isLogin, setIsLogin] = useState(true)
  const [isError, setIsError] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    setIsError(false)

    if (isLogin) {
      // handle login form submission
      axios
        .post(apiList.login, formData)
        .then((response) => {
          if (response.status === 200) {
            navigateTo("/create-election") // Redirect to create-election after successful login
            handleLogin(response.data)
            localStorage.setItem("user", JSON.stringify(response.data))
          } else {
            setIsError(true)
          }
        })
        .catch((error) => {
          console.log(error?.response?.data)
          setIsError(true)
        })
    } else {
      // handle signup form submission
      axios
        .post(apiList.register, formData)
        .then((response) => {
          console.log(response.data)
          if (response.status === 201) {
            navigateTo("/create-election") // Redirect to create-election after successful login
            localStorage.setItem("user", JSON.stringify(response.data))
          } else {
            setIsError(!isError)
          }
        })
        .catch((error) => {
          console.log(error?.response?.data)
          setIsError(!isError)
        })
    }
  }

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
              className="border border-gray-400 p-2 rounded"
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
              className="border border-gray-400 p-2 rounded"
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
        {isError && (
          <span className="text-red-800">
            Whooza!! Please check your credentials.
          </span>
        )}
      </div>
    </div>
  )
}

export default Forms
