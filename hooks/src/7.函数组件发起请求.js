
// 回忆类组件是如何发请求的
// 是在componentDidMount生命周期里发请求，仅仅只在DOM组件渲染挂载完毕时执行一次
// 而函数组件要模仿类组件执行的时机

import { useEffect } from "react"

// 只有useEffect空数组最契合
function Request () {
  useEffect(() => {
    /*  不能直接写成 下面的写法
      useEffect(async () => {
        const res = await fecth(.....

      })
    */
    async function getRequest () {
      const res = await fetch('http://geek.itheima.net/v1_0/channels')
      console.log(res)
    }
    getRequest()
  }, [])
}
function App () {
  return (
    <div>
      <Request></Request>
    </div>
  )
}

export default App
