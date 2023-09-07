import { useState, useEffect } from "react"
function App () {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('yip')
  useEffect(() => {
    console.log('副作用又执行了')
    document.title = count
    console.log(name)
  }, [count, name])
  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <button onClick={() => setName('myq')}>{name}</button>
    </div>
  )
}

export default App
