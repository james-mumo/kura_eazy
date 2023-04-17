import express from "express"
import mongoose from "mongoose"

const voterRouter = express.Router()

const voterModel = mongoose.model(
  "voter",
  new mongoose.Schema(
    {
      fullName: String,
      voterID: String,
      regLocation: String,
      sex: String,
      age: String,
      votingToken: String,
      imgUrl: String,
    },
    { timestamps: true } // Add timestamps option
  )
)

// add voters
voterRouter.post("/addvoters", async (req, res) => {
  try {
    const voters = req.body
    const savedVoters = []

    for (const voter of voters) {
      const { fullName, voterID, regLocation, sex, age, votingToken, imgUrl } =
        voter

      const newVoter = new voterModel({
        fullName,
        voterID,
        regLocation,
        imgUrl,
        sex,
        age,
        votingToken,
      })

      const savedVoter = await newVoter.save()
      savedVoters.push(savedVoter)
    }

    res.status(201).json(savedVoters)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// get voters
voterRouter.get("/voters", async (req, res) => {
  try {
    const voters = await voterModel.find()
    res.status(200).json(voters)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// update voter
voterRouter.put("/update:id", async (req, res) => {
  const { fullName, voterID, regLocation, sex, age, votingToken, imgUrl, _id } =
    req.body

  try {
    const updatedVoter = await voterModel.findByIdAndUpdate(_id, {
      _id,
      fullName,
      voterID,
      regLocation,
      imgUrl,
      sex,
      age,
      votingToken,
    })

    if (!updatedVoter) {
      console.log("not found")
      return res.status(404).send({ msg: "Voter not found", err: res.data })
    }

    res.status(200).json(updatedVoter)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

export default voterRouter
