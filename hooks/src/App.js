import useWindowScroll from './3.useWindowScroll'
function App () {
  const y = useWindowScroll()
  return (
    <div style={{ height: '12000px' }}>{y}</div>
  )
}

export default App
