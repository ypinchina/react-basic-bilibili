import React from "react"
function SonF ({ list, msg, eat, child }) {
  eat()

  return (
    <>
      {list.map(item => <li key={item}>{item}</li>)}
      <div>函数{msg}</div>
      {child}
    </>
  )
}
class SonC extends React.Component {
  render () {
    return <div>类{this.props.msg}</div>
  }
}
class App extends React.Component {
  state = {
    msg: '组件通信',
    list: [1, 2, 3],
    me: {
      age: 30,
      name: 'yip',
      sex: 'male'
    },
    eat: () => {
      console.log('I love eatting')
    },
    testComponent: (<div>
      <span>I don't like coding</span>
    </div>)
  }
  render () {
    return (
      <>
        <SonC msg={this.state.msg}></SonC>
        <SonF msg={this.state.msg} eat={this.state.eat} list={this.state.list} child={this.state.testComponent}></SonF>
      </>
    )
  }
}

export default App