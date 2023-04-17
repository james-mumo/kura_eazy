import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userRouter = express.Router()

const userModel = mongoose.model(
  "user",
  new mongoose.Schema({
    email: String,
    password: String,
  })
)

// Login User
userRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(400).send({ msg: "Invalid Credentials" })
    }
    const isMatch = bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).send({ msg: "Invalid Credentials" })
    }

    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Internal Server Error" })
  }
})

//signup user

userRouter.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      return res.status(400).send({ msg: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new userModel({
      //   fullname,
      email,
      isAdmin: false,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()

    res.status(201).send(savedUser)
    console.log(savedUser)
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Internal Server Error" })
  }
})

export default userRouter
