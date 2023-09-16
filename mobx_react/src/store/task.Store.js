
import {  makeAutoObservable } from 'mobx'
import {v4} from 'uuid'
class TaskStore {
  list = [
    {
      id:1,
      name: '学习react',
      isDone: true
    },
    {
      id:2,
      name: '搞定mobx',
      isDone: true
    }
  ]
  addListItem = (name) => {
    let newUuid = v4()
    this.list.push({
      id: newUuid,
      name,
      isDone: false
    })
  }
  deleteListItem = (id) => {
    this.list = this.list.filter(item => item.id !== id)
  }
  constructor() {
    makeAutoObservable(this)
  }
}
export default TaskStore
