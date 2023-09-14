import { makeAutoObservable } from "mobx"
class List {
  list = ['vue', react]
  constructor() {
    makeAutoObservable(this)
  }
  addList = () => {
    this.list.push('angular')
  }
}
export default List