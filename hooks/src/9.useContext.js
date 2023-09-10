import { createContext, useContext, useState } from "react"
const Context = createContext()
function C () {
  const count = useContext(Context)
  return (
    <div>this is C<br></br>this is parent component's {count}</div>
  )
}
function A () {
  const count = useContext(Context)
  return (
    <div>
      <div>this is A<br></br>this is parent component's {count}</div>
      <C></C>
    </div>
  )
}
function App () {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Context.Provider value={count}>
        <A></A>
      </Context.Provider>
      <button onClick={() => { setCount(count + 1) }}>click </button>
    </div>
  )
}

export default App