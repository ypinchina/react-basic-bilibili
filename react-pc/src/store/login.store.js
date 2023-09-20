import { makeAutoObservable } from 'mobx'
import { http, Token } from '@/utils/index'
const tk = new Token()
class LoginStore {
  token = tk.getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  login = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    this.token = res.data.token
    tk.setToken(this.token)
  }
}

export default LoginStore