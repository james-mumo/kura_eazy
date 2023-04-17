// Importing the required packages using ES6 imports
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { faker } from "@faker-js/faker"
import cors from "cors"
import userRouter from "./routes/userRoutes.js"
import voterRouter from "./routes/voterRouter.js"
import candidatesRouter from "./routes/candidatesRouter.js"
import electionsRouter from "./routes/electionsRouter.js"

// Creating an instance of Express
const app = express()
dotenv.config()

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use("/api/user", userRouter)
app.use("/api/voter", voterRouter)
app.use("/api/candidates", candidatesRouter)
app.use("/api/election", electionsRouter)

// Connecting to the MongoDB database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Checking the database connection status
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))
db.once("open", function () {
  console.log("Connected to MongoDB database.")
})

// Defining the server's routes
app.get("/", (req, res) => {
  const records = []

  for (let i = 0; i < 10; i++) {
    const record = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
    }

    records.push(record)
  }

  console.log(records)
  res.send("Faker records generated")
})
// Starting the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}.
    \nServer is Running at http://localhost:${PORT}`
  )
})
