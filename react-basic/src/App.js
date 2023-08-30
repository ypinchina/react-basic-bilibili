import React from "react"
class ConsoleThis extends React.Component {
  handler () {
    // 老式错误的写法 this为undefined
    console.log(this)
    /* 经过修正后this指向此类的实例, 所以证明onClick的外方法是render，
       不妨打印一下render函数中的this，显然也是指向实例的，因此可以推测react在render函数内部对this的指向
       做了修正
    */
  }
  render () {
    console.log('render函数内部的this的指向为：', this)
    // 修正方法二： onClick改变写法
    return <button onClick={() => this.handler()}>click</button>
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