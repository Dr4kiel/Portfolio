import { useState, useEffect } from 'react'

export function useTypingEffect(text: string, speedMs = 18) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    if (!text) return

    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speedMs)

    return () => clearInterval(interval)
  }, [text, speedMs])

  return displayed
}
