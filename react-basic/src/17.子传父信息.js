import React from "react"
function SonF ({ getSonMsg }) {

  return (
    <>
      <div>this is son</div>
      <button onClick={() => getSonMsg('我是子组件传给父组件的信息')}>click</button>
    </>
  )
}
class App extends React.Component {
  state = {

  }
  getSonMsg = (val) => {
    console.log(val)
  }
  render () {
    return (
      <>
        <SonF getSonMsg={this.getSonMsg}></SonF>
      </>
    )
  }
}

export default App