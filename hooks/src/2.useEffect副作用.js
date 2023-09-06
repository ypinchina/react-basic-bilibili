import { useState, useEffect } from "react"
function App () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    // 每次重新渲染组件 副作用都会重新执行一次
    document.title = count
  })
  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App
