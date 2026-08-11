import { useEffect, useState } from 'react'

interface Countdown {
  remainingMs: number
  minutes: number
  seconds: number
  expired: boolean
}

export function useCountdown(expiresAt: number): Countdown {
  const [remainingMs, setRemainingMs] = useState(() =>
    Math.max(0, expiresAt - Date.now())
  )

  useEffect(() => {
    setRemainingMs(Math.max(0, expiresAt - Date.now()))

    const id = setInterval(() => {
      setRemainingMs(Math.max(0, expiresAt - Date.now()))
    }, 1000)

    return () => clearInterval(id)
  }, [expiresAt])

  const minutes = Math.floor(remainingMs / 60000)
  const seconds = Math.floor((remainingMs % 60000) / 1000)

  return {
    remainingMs,
    minutes,
    seconds,
    expired: remainingMs <= 0,
  }
}
