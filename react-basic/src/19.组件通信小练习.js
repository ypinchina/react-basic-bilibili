import React from "react"
function ListItem ({ item, deleteItem }) {
  return <>
    <div>商品：{item.name}</div>
    <div>优惠：{item.info}</div>
    <div>价格：{item.price}</div>
    <div><button onClick={() => deleteItem(item.id)}>删除</button></div>
  </>
}
class App extends React.Component {
  state = {
    list: [
      { id: 1, name: '超级好吃的棒棒糖', price: 18.8, info: '开业大酬宾，全场8折' },
      { id: 2, name: '超级好吃的大鸡腿', price: 34.2, info: '开业大酬宾，全场8折' },
      { id: 3, name: '超级无敌的冰激凌', price: 14.2, info: '开业大酬宾，全场8折' }
    ]
  }
  deleteItem = (id) => {
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }
  render () {
    return this.state.list.map(item => <ListItem item={item} key={item.id} deleteItem={this.deleteItem}></ListItem>)
  }
}

export default App