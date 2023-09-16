import './index.css'
import { useStore } from '../store/index'
function Task() {
  const { taskStore } = useStore()
  console.log(taskStore)
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {taskStore.list.map(item => (
            <li
              className={!item.isDone ? 'todo completed' : 'todo'}
              key={item.id}
            >
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label >{item.name}</label>
                <button className="destroy" onClick={() => taskStore.deleteListItem(item.id)}></button>
              </div>
            </li>)
          )}

          {/* <li
            className="todo completed"
          >
            <div className="view">
              <input className="toggle" type="checkbox" defaultChecked={true}/>
              <label >learn react</label>
              <button className="destroy"></button>
            </div>
          </li> */}
        </ul>
      </section>
    </section>
  )
}

export default Task