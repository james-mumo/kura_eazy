import { useEffect, useState } from "react"

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime()
  //   console.log("countDownDate", countDownDate)
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  )
  //   console.log("countDown", countDown)
  //   console.log("now", new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])
  return getReturnValues(countDown)
}

const getReturnValues = (countDown) => {
  //finding time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const mins = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const secs = Math.floor((countDown % (1000 * 60)) / 1000)

  return [days, hours, mins, secs]
}

export { useCountdown }
