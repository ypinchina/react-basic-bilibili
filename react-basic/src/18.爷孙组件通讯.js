import React, { createContext } from "react"
const { Provider, Consumer } = createContext()
function SonA () {
  return (<div>
    this is SonA
    <SonC />
  </div>)
}
function SonC () {

  return <div>this is SonC<Consumer>{value => <div>{value}</div>}</Consumer></div>
}
class App extends React.Component {
  state = {
    msg: '爷孙组件通信'
  }
  render () {
    return (
      <>
        <div>
          this is app
          <Provider value={this.state.msg}>
            <SonA></SonA>
          </Provider>
        </div>
      </>
    )
  }
}

export default App