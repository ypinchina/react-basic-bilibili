import countObj from "./store/count"
import { observer } from 'mobx-react-lite'
function App () {
  return (
    <div className="App">
      {countObj.count}
      <div><button onClick={() => { countObj.addCount() }}>+</button></div>
      <div>{countObj.biggerThanTwoList.join('-')}</div>
      <button onClick={() => countObj.addList()}>push</button>
    </div>
  )
}

export default observer(App)
