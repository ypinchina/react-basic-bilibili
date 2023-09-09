import { useState, useEffect } from "react"
export function useStorage (key, defaultValue) {
  const [message, setMessage] = useState(defaultValue)
  useEffect(() => {
    window.localStorage.setItem(key, message)
  }, [key, message])
  return [message, setMessage]
}