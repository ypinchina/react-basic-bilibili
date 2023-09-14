import { observer } from 'mobx-react-lite'
import { useStore } from './store/index'
function App () {
  const { listStore, countStore } = useStore()
  return (
    <div className="App">
      {countStore.count}
      <button onClick={countStore.addCount}>+</button>
      {listStore.list.join('-')}
    </div>
  )
}

export default observer(App)
