import React from "react"
class CountAdd extends React.Component {
  state = {
    count: 0
  }
  addCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render () {
    return <button onClick={this.addCount}>{this.state.count} click</button>
  }
}
function App () {
  return (
    <div className="App">
      <CountAdd />
    </div>
  )
}

export default App
