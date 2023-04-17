import React from "react"
import { useCountdown } from "../logic/useCountdown"
import CountDownExpired from "./CountDownExpired"
import ShowCounter from "./ShowCounter"

const CountDownTimer = ({ targetDate }) => {
  const [days, hours, mins, secs] = useCountdown(targetDate)
  if ((days + hours, mins + secs) < 0) {
    return <CountDownExpired />
  } else {
    return <ShowCounter days={days} hours={hours} mins={mins} secs={secs} />
  }
}

export default CountDownTimer
