import { Token } from "@/utils"
import { Navigate } from "react-router-dom"
function AuthRoute ({ children }) {
  // react高阶组件，参数是另一个DOM组件
  const tk = new Token()
  if (tk.getToken()) {
    // 如果有token
    return <>{children}</>
  } else {
    return <><Navigate to='login' replace></Navigate></>
  }
}
export default AuthRoute