import LoginStore from "./login.store"
class RootStore {
  constructor() {
    this.loginStore = new this.LoginStore()
  }
}
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => {
  return React.useContext(context)
}

export default useStore