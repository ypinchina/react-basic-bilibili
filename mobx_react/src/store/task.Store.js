
import { makeAutoObservable } from 'mobx'
class TaskStore {
  list = [
    {
      id: 1,
      name: '学习react',
      isDone: true
    },
    {
      id: 2,
      name: '搞定mobx',
      isDone: true
    }
  ]
  addListItem = (newItem) => {
    this.list.push(newItem)
  }
  deleteListItem = (index) => {
    this.list.splice(index, 1)
  }
  singleChange = (checked, id) => {
    const result = this.list.find(item => item.id === id)
    result.isDone = checked
  }
  get allChecked () {
    return this.list.every(item => item.isDone)
  }
  allCheckChange = (allChecked) => {
    this.list.forEach(item => item.isDone = allChecked)
  }
  constructor() {
    makeAutoObservable(this)
  }
}
export default TaskStore
