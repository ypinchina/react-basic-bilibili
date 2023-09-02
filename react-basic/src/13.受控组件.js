import React from "react"
class ComponentControl extends React.Component {
  state = {
    message: 'this is message'
  }
  render () {
    return <input type="text" value={this.state.message} onChange={this.changeMsg} />
  }
  changeMsg = (e) => {
    this.setState({
      message: e.target.value
    })
  }
}
function App () {
  return (
    <div className="App">
      <ComponentControl />
    </div>
  )
}

export default App