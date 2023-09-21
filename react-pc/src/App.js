import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import AuthRoute from './components/AuthRoute'
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'
import './App.css'

function App () {
  return (
    < BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<AuthRoute><Layout></Layout></AuthRoute>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='/article' element={<Article></Article>}></Route>
            <Route path='/publish' element={<Publish></Publish>}></Route>
          </Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
