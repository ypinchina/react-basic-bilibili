import LoginStore from "./login.store"
import React from "react"

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
  }
}
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => {
  return React.useContext(context)
}

export default useStore