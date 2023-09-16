import './index.css'
import { useStore } from '../store/index'
import { observer } from 'mobx-react-lite'
import uuid from 'react-uuid'
import { useState } from 'react'

function Task () {
  const { taskStore } = useStore()
  const [newThing, setNewThing] = useState('')
  function allChecked (e) {
    taskStore.allCheckChange(e.target.checked)
  }
  function singleChange (e, id) {
    taskStore.singleChange(e.target.checked, id)
  }
  function deleteListItem (index) {
    taskStore.deleteListItem(index)
  }
  function addListItem (e) {
    if (e.keyCode === 13) {
      taskStore.addListItem({
        id: uuid(),
        name: newThing,
        isDone: false
      })
      setNewThing('')
    }
  }
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          onKeyDown={addListItem}
          value={newThing}
          onChange={(e) => setNewThing(e.target.value)}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.allChecked}
          onChange={allChecked}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {taskStore.list.map((item, index) => (
            <li
              className={!item.isDone ? 'todo completed' : 'todo'}
              key={item.id}
            >
              <div className="view">
                <input className="toggle" type="checkbox" checked={item.isDone} onChange={(e) => singleChange(e, item.id)} />
                <label >{item.name}</label>
                <button className="destroy" onClick={() => deleteListItem(index)}></button>
              </div>
            </li>)
          )}
        </ul>
      </section>
    </section>
  )
}

export default observer(Task)