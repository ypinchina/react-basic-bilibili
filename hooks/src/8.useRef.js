
import React, { useRef, useEffect } from "react"
class Test extends React.Component {
  state = {
    name: 'yip'
  }
  render () {
    return <div>{this.state.name}</div>
  }
}
function App () {
  const h1Ref = useRef(null)
  const testRef = useRef(null)
  useEffect(() => {
    console.log(h1Ref.current)
    console.log(testRef.current)
  })
  return (
    <div>
      <h1 ref={h1Ref}>this is h1</h1>
      <Test ref={testRef}></Test>
    </div>
  )
}

export default App
