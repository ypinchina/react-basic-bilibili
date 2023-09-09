import { useState, useEffect } from "react"
function Test () {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('定时器在计时')
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })
  return (
    <div>this is Test component</div>
  )
}
function App () {
  const [flag, setFlag] = useState(true)
  return (
    <div>
      {flag ? <Test></Test> : null}
      <button onClick={() => {
        setFlag(false)
      }}>click</button>
    </div>
  )
}

export default App
