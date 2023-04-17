import express from "express"
import mongoose from "mongoose"

const candidatesRouter = express.Router()

const candidateModel = mongoose.model(
  "candidate",
  new mongoose.Schema(
    {
      fullName: String,
      voterID: String,
      regLocation: String,
      sex: String,
      age: String,
      votingToken: String,
      imgUrl: String,
      positionVied: String,
      party: String,
      partyIconUrl: String,
      campaignHeader: String,
      campaignMainAgenda: String,
      electionContesting: String,
    },
    { timestamps: true } // Add timestamps option
  )
)
const nominationModel = mongoose.model(
  "nomination",
  new mongoose.Schema(
    {
      fullName: String,
      voterID: String,
      regLocation: String,
      sex: String,
      age: String,
      votingToken: String,
      imgUrl: String,
      positionVied: String,
      party: String,
      partyIconUrl: String,
      campaignHeader: String,
      campaignMainAgenda: String,
    },
    { timestamps: true } // Add timestamps option
  )
)

// add nominations
candidatesRouter.post("/addnominations", async (req, res) => {
  try {
    const nominations = req.body
    const savedNominations = []

    for (const nominee of nominations) {
      const {
        fullName,
        voterID,
        regLocation,
        sex,
        age,
        votingToken,
        imgUrl,
        positionVied,
        party,
        partyIconUrl,
        campaignHeader,
        campaignMainAgenda,
      } = nominee

      const newNomination = new nominationModel({
        fullName,
        voterID,
        regLocation,
        imgUrl,
        sex,
        age,
        votingToken,
        positionVied,
        party,
        partyIconUrl,
        campaignHeader,
        campaignMainAgenda,
      })

      const savedNominee = await newNomination.save()
      savedNominations.push(savedNominee)
    }

    res.status(201).json(savedNominations)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})
// add candidates
candidatesRouter.post("/add", async (req, res) => {
  try {
    const candidates = req.body
    const savedCandidates = []

    for (const candidate of candidates) {
      const {
        fullName,
        voterID,
        regLocation,
        sex,
        age,
        votingToken,
        imgUrl,
        positionVied,
        party,
        partyIconUrl,
        campaignHeader,
        campaignMainAgenda,
        electionContesting,
      } = candidate

      const newCandidate = new candidateModel({
        fullName,
        voterID,
        regLocation,
        imgUrl,
        sex,
        age,
        votingToken,
        positionVied,
        party,
        partyIconUrl,
        campaignHeader,
        campaignMainAgenda,
        electionContesting,
      })

      const savedCandidate = await newCandidate.save()
      savedCandidates.push(savedCandidate)
    }

    res.status(201).json(savedCandidates)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// get nominations
candidatesRouter.get("/nominations", async (req, res) => {
  try {
    const nominations = await nominationModel.find()
    res.status(200).json(nominations)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// get candidates
candidatesRouter.get("/", async (req, res) => {
  try {
    const voters = await candidateModel.find()
    res.status(200).json(voters)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// update voter
candidatesRouter.put("/update:id", async (req, res) => {
  const { fullName, voterID, regLocation, sex, age, votingToken, imgUrl, _id } =
    req.body

  try {
    const updatedVoter = await candidateModel.findByIdAndUpdate(_id, {
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

export default candidatesRouter
