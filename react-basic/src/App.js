import React from "react"
function SonF (props) {
  return <div>函数{props.msg}</div>
}
class SonC extends React.Component {
  render () {
    return <div>类{this.props.msg}</div>
  }
}
class App extends React.Component {
  state = {
    msg: '组件通信'
  }
  render () {
    return (
      <>
        <SonC msg={this.state.msg}></SonC>
        <SonF msg={this.state.msg}></SonF>
      </>
    )
  }
}

export default App