import LoginStore from "./login.store"
import UserStore from "./user.store"
import ChannelStore from "./channels.store"
import React from "react"

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => {
  return React.useContext(context)
}

export default useStore