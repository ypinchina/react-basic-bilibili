
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom'
import { Home } from './router/Home'
import { About } from './router/About'
function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to='/'>首页</Link>
        <Link to='/about'>关于</Link>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/about' element={<About></About>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
