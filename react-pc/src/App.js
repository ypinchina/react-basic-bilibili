import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import './App.css'
// 导入必要组件
import { lazy, Suspense } from 'react'
// 按需导入路由组件
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App () {
  return (
    < BrowserRouter>
      <div className='App'>
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
        >
          <Routes>
            <Route path='/' element={<AuthRoute><Layout></Layout></AuthRoute>}>
              <Route index element={<Home></Home>}></Route>
              <Route path='/article' element={<Article></Article>}></Route>
              <Route path='/publish' element={<Publish></Publish>}></Route>
            </Route>
            <Route path='/login' element={<Login></Login>}></Route>
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App
