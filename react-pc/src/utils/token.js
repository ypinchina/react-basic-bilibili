class Token {
  key = 'pc-key'
  setToken = (value) => {
    return window.localStorage.setItem(this.key, value)
  }
  getToken = () => {
    return window.localStorage.getItem(this.key)
  }
  removeToken = () => {
    return window.localStorage.removeItemItem(this.key)
  }
}

export default Token