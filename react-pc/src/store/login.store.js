import { makeAutoObservable } from 'mobx'
import { http } from '@/utils/http'

class LoginStore {
  token = ''
  constructor() {
    makeAutoObservable(this)
  }
  setToken = async ({ mobile, code }) => {
    const res = await http.post({
      mobile, code
    })
    this.token = res.data
  }
}

export default LoginStore