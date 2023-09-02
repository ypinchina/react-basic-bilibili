import React, { createRef } from "react"
class NotControlForm extends React.Component {
  msgRef = createRef()
  render () {
    return (<>
      <input ref={this.msgRef}></input>
      <button onClick={() => {
        console.log(this.msgRef.current.value)
      }}>output</button>
    </>)
  }
}
function App () {
  return (
    <div className="App">
      <NotControlForm />
    </div>
  )
}

export default App