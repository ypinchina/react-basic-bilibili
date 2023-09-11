import { useNavigate } from "react-router-dom"
function Login () {
  const usenav = useNavigate()
  function gotoAbout () {
    usenav('/about')
  }
  return (
    <div><button onClick={gotoAbout}>Login</button></div>
  )
}
export default Login