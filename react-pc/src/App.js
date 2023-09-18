import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import { Button } from 'antd'

function App () {
  return (
    < BrowserRouter>
      <div className="App">
        app
        <Routes>
          <Route path='/' element={<Layout></Layout>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
        <Button type="primary">Primary Button</Button>
      </div>
    </BrowserRouter>
  )
}

export default App
