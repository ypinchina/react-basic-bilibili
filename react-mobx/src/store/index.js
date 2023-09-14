import List from "./list.store"
import CountStore from "./count.store"

class RootStore {
  constructor() {
    this.listStore = new List()
    this.countStore = new CountStore()
  }
}

export default RootStore