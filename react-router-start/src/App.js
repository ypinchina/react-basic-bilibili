import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './router/Login.js'
import Layout from './router/Layout'
import Article from "./router/Article.js"
import Board from "./router/Board.js"
function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/article" element={<Article></Article>}></Route>
          <Route path="/board" element={<Board></Board>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App