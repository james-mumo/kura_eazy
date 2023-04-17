import express from "express"
import mongoose from "mongoose"

const electionsRouter = express.Router()

const electionModel = mongoose.model(
  "election",
  new mongoose.Schema(
    {
      itemAdmin: String,
      itemType: String,
      itemTitle: String,
      isNominations: String,
      itemDesc: String,
      candidates: Array,
      startDate: String,
      endDate: String,
    },
    { timestamps: true } // Add timestamps option
  )
)

// add election
electionsRouter.post("/add", async (req, res) => {
  try {
    const newElection = new electionModel(req.body)

    const savedElection = await newElection.save()
    console.log("newElection", savedElection)

    res.status(201).json(savedElection)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// get election with id
electionsRouter.get("/:id", async (req, res) => {
  try {
    const election = await electionModel.findById(req.params.id)
    if (election) {
      res.status(200).json(election)
    } else {
      res.status(404).json("Not Found")
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// update voter
electionsRouter.put("/update:id", async (req, res) => {
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
// delete voter
electionsRouter.put("/update:id", async (req, res) => {
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

export default electionsRouter
