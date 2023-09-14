import List from "./list.store"
import CountStore from "./count.store"
import React from "react"


class RootStore {
  constructor() {
    this.listStore = new List()
    this.countStore = new CountStore()
  }
}

const rootStore = new RootStore()
const rootContext = React.createContext(rootStore)
const useStore = () => React.useContext(rootContext)

export { useStore }