import { makeAutoObservable } from 'mobx'
class CountStore {
  count = 0
  list = [1, 2, 3, 4, 5, 6]
  constructor() {
    makeAutoObservable(this)
  }
  addCount = () => {
    this.count++
  }
  get biggerThanTwoList () {
    return this.list.filter(item => item > 2)
  }
  addList = () => {
    this.list.push(7, 8, 9)
  }
}
export default CountStore