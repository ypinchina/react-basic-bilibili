import React from 'react'
class ComponentTest extends React.Component {
  state = {
    // 在这里可以定义各种属性，全是当前组件的状态
    name: 'Yip'
  }
  changeName = () => {
    // 注意 在react中修改状态是和Vue不一样的，不能直接给状态赋值，而是需要通过setState方法来统一修改状态
    this.setState({
      name: '一碰'
    })
  }
  render () {
    return (
      <>
        <div>This is a teacher, his name is {this.state.name}</div>
        <div>
          <button onClick={this.changeName}>修改</button>
        </div>
      </>

    )
  }
}
function App () {
  return (
    <div className="App">
      <ComponentTest></ComponentTest>
    </div>
  )
}

export default App
