import React from "react"
class ConsoleThis extends React.Component {
  constructor() {
    super()
    // 为了修正下面this指向的错误，老式的写法 es6没出来之前 没有箭头函数时 学习这种写法为了维护老项目
    this.handler = this.handler.bind(this)
  }
  handler () {
    // 老式错误的写法 this为undefined
    console.log(this)
  }
  render () {
    return <button onClick={this.handler}>click</button>
  }
}
function App () {
  return (
    <div className="App">
      <ConsoleThis />
    </div>
  )
}

export default App