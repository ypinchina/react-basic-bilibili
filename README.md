# react-basic-bilibili

一个在 b 站学习 react 的基础项目，学习地址为： https://www.bilibili.com/video/BV1Z44y1K7Fj

## react 18 的问题，需要删除 index.js 下 <React.StrictMode>严格模式节点。

### react 有两种组件

1. 函数组件  
   函数组件有以下约定：

- 函数首字母必须大写
- 函数必须要有返回值，返回值为需要渲染的 DOM 节点组件结构
- 组件就像 HTML 标签一样可以直接渲染到页面中
- 使用函数名称作为组件标签名称，该标签既可以成对出现也可以自闭合

2. 类组件  
   类组件也有如下的规定

- 类组件名首字母也需要大写
- 类组件应当继承 React.Component 父类，从而获得父类的方法和属性
- 类组件内部必须提供 render 方法，render 方法必须有返回值，返回值是需要渲染的组件 DOM 结构

#### 组件状态

能够为组件添加状态和修改状态的值

- tips 在 hooks 出现之前，组件状态只能以类组件的方式表现。此时函数组件没有状态，称为无状态组件

- 注意 在 React 中修改状态是和 Vue 不一样的，不能直接给状态赋值，而是需要通过 setState 方法(通过继承 React.Component 得到)来统一修改状态。 因为 React 是单向数据绑定 ，而不是 vue 这种双向数据绑定的 MVVM 框架。

- React 中编写组件其实就是编写原生 js 类或者函数

**目前新项目已经很少人会去写类组件了** ，但是需要学习是为了应付当遇到老项目时要维护类组件的代码。

#### React 的状态不可变

**概念： 不要直接修改状态的值，而是基于当前状态创建新的状态值**

Number 类型，不能 ++1 1++ 等操作
数组不能 push slice 方法，新增要用 `this.setState({ arr: [...this.state.arr, 4] })`  
数组删除要用 filter 方法
对象修改属性值不稚直接修改，要 `this.setState({ obj: {...this.state.obj, name: 'yip' } })`

#### 受控表单组件

什么是受控表单组件？ 答： input 框自己的状态被 React 组件状态控制

#### 什么是非受控组件？

非受控组件就是通过手动操作 dom 的方式获取文本框的值，文本框的状态不受 react 组件的 state 中的状态控制，直接通过原生 dom 获取输入框的值

- 实现步骤

1. 导入 createRef 函数
2. 调用 createRef 函数，创建一个 ref 对象，存储到名为 msgRef 的实例属性中
3. 为 input 添加 ref 属性，值为 msgRef
4. 在按钮的事件处理程序中，通过 msgRef.current 即可拿到 input 对应的 dom 元素，而其中 msgRef.current.value 拿到的就是文本框的值

### React 组件通信

#### 组件通信的意义

组件是独立且封闭的单元，默认情况下组件只能使用自己的数据（state）  
组件化开发的过程中，完整的功能会拆分多个组件，在这个过程中不可避免的需要互相传递一些数据  
为了能让各组件之间可以进行互相沟通，数据传递，这个过程就是组件通信

1. 父子关系 - 最重要的
2. 兄弟关系 - 自定义事件模式产生技术方法 eventBus / 通过共同的父组件通信
3. 其它关系 - mobx / redux / zustand / 基于 hook 的方案

- 父传子实现  
  目标任务: 实现父子通信中的父传子，把父组件中的数据传给子组件

实现步骤

1.  父组件提供要传递的数据 - state
2.  给子组件标签添加属性值为 state 中的数据
3.  子组件中通过 props 接收父组件中传过来的数据  
    a. 类组件使用 this.props 获取 props 对象  
    b. 函数式组件直接通过参数获取 props 对象

#### props 说明

目标任务: 知道 props 传递时的一些注意事项

1.  props 是只读对象（readonly） 与 vue 一样
    根据单项数据流的要求，子组件只能读取 props 中的数据，不能进行修改
2.  props 可以传递任意数据
    数字、字符串、布尔值、数组、对象、**函数、JSX(等于 vue 里面的插槽传递)**

#### 子传父实现

- 口诀： 父组件给子组件传递回调函数，子组件调用 核心是父组件给子组件传递方法

#### 兄弟组件通信

弟传父，父传兄

#### 爷孙，曾重孙组件通信

类似 Vue 2.2 版本出的 provide 和 inject

- 实现步骤

1. 创建 Context 对象 导出 Provider 和 Consumer 对象

```
const { Provider, Consumer } = createContext()
```

2. 使用 Provider 包裹上层组件提供数据

```
<Provider value={this.state.message}>
    {/* 根组件 */}
</Provider>
```

3. 需要用到数据的组件使用 Consumer 包裹获取数据

```
<Consumer >
    {value => /* 基于 context 值进行渲染*/}
</Consumer>
```

### React 组件进阶

children 属性是什么
表示该组件的子节点，只要组件内部有子节点，props 中就有该属性
children 可以是什么

1. 普通文本
2. 普通标签元素
3. 函数 / 对象
4. JSX

#### React props 校验规则 （此处省略） 要写的时候再看文档补吧

### React 生命周期

- 只有类组件有生命周期，函数组件没有
  react 版本 16.4 前后生命周期不一样

#### 生命周期 - 挂载阶段

顺序
constructor -> render -> componentDidMount

constructor： 初始化阶段只执行一次  
render： 只要组件渲染或者重新渲染都会执行; 作用：渲染 UI（千万不要在 render 里面调用 setState，会死循环）  
componentDidMount: 组件挂载（完成 DOM 渲染）后执行，初始化的时候只试行一次；作用：发请求和 DOM 操作

#### 生命周期 - 更新阶段

顺序
render -> componentDidUpdate
每次更新阶段都会执行以上一次

componentDidUpdate 触发时机： 组件更新后（DOM 渲染完毕）； 作用： DOM 操作。获取 DOM 更新后的内容，**不要调用 setState**

#### 生命周期 - 卸载阶段

componentWillUnmount 触发时机： 组件卸载（从页面上消失） 作用：执行清理工作（比如清理定时器）

## hooks

1. 什么是 hooks
   Hooks 的本质：一套能够使函数组件更强大，更灵活的“钩子”

React 体系里组件分为 类组件 和 函数组件  
经过多年的实战，函数组件是一个更加匹配 React 的设计理念 UI = f(data)，也更有利于逻辑拆分与重用的组件表达形式，**而先前的函数组件是不可以有自己的状态的，为了能让函数组件可以拥有自己的状态，所以从 react v16.8 开始，Hooks 应运而生**

注意点：

1. 有了 hooks 之后，为了兼容老版本，class 类组件并没有被移除，俩者都可以使用
2. 有了 hooks 之后，不能再把函数认为是无状态组件了，因为 hooks 为函数组件提供了状态
3. hooks 只能在函数组件中使用(类组件使用会报错)

4. Hooks 解决了什么问题  
   Hooks 的出现解决了俩个问题 1. 组件的状态逻辑复用 2.class 组件自身的问题
5. 组件的逻辑复用
   在 hooks 出现之前，react 先后尝试了 mixins 混入，HOC 高阶组件，render-props 等模式  
   但是都有各自的问题，比如 mixin 的数据来源不清晰，高阶组件的嵌套问题等等
6. class 组件自身的问题  
   class 组件就像一个厚重的‘战舰’ 一样，大而全，提供了很多东西，有不可忽视的学习成本，比如各种生命周期，this 指向问题等等，而我们更多时候需要的 是一个轻快灵活的'快艇'

### useState 使用

`[name, setName] = useState(value)`

- 数组内的属性名可以自定义，但是顺序不能改变，value 是属性的初始值

- setName 函数不能直接修改 name 的原值，只能生成一个新值替换原值

### hooks 函数组件的更新过程

函数组件使用 useState hook 后的执行过程，以及状态值的变化

- ● 组件第一次渲染
  a. 从头开始执行该组件中的代码逻辑
  b. 调用 useState(0) 将传入的参数作为状态初始值，即：0
  c. 渲染组件，此时，获取到的状态 count 值为： 0
- ● 组件第二次渲染
  a. 点击按钮，调用 setCount(count + 1) 修改状态，因为状态发生改变，所以，该组件会重新渲染
  b. 组件重新渲染时，会再次执行该组件中的代码逻辑
  c. 再次调用 useState(0)，此时 React 内部会拿到最新的状态值而非初始值，比如，该案例中最新的状态值为 1
  d. 再次渲染组件，此时，获取到的状态 count 值为：1

**注意：useState 的初始值(参数)只会在组件第一次渲染时生效。**也就是说，以后的每次渲染，useState 获取到都是最新的状态值，React 组件会记住每次最新的状态值

### useState 使用规则

1. useState 可以执行多次，每次都是绑定一对相互独立，互不影响

```
function List(){
  // 以字符串为初始值
  const [name, setName] = useState('cp')
  // 以数组为初始值
  const [list,setList] = useState([])
  // 以布尔值作为初始值
  const [flag, setFlag] = useState(true)
}
```

2.  useState 注意事项  
    a. 只能出现在函数组件或者其他 hook 函数中  
    b. 不能嵌套在 if/for/其它函数中（react 按照 hooks 的调用顺序识别每一个 hook）

3.  useState 回调函数的参数

- 使用场景

参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过计算才能获得，则可以传入一个函数，在函数中计算并返回初始的 state，**此函数只在初始渲染时被调用**

### useEffect

1. 理解函数副作用

什么是副作用?
副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于 React 组件来说，主作用就是根据数据（state/props）渲染 UI，除此之外都是副作用（比如，手动修改 DOM）

常见的副作用

1. 数据请求 ajax 发送
2. 手动修改 dom
3. localstorage 操作

useEffect 函数的作用就是为 react 函数组件提供副作用处理的！  
像 vue3 的 watchEffect

1. 不添加依赖项(默认状态)

组件首次渲染执行一次，以及不管是哪个状态更改引起组件更新时都会重新执行

- 组件初始渲染
- 组件更新 （不管是哪个状态引起的更新）

2. 添加空数组  
   组件只在首次渲染时执行一次

3. 添加特定依赖项  
   副作用函数在首次渲染时执行，在依赖项发生变化时重新执行

- 注意事项
  useEffect 回调函数中用到的数据（比如，count）就是依赖数据，就应该出现在依赖项数组中，如果不添加依赖项就会有 bug 出现

4. 清理副作用
   如果想要清理副作用 可以在副作用函数中的末尾 return 一个新的函数，在新的函数中编写清理副作用的逻辑
   注意执行时机为：
1. 组件卸载时自动执行
1. 组件更新时，下一个 useEffect 副作用函数执行之前自动执行

1. 函数组件发起请求

// 回忆类组件是如何发请求的
// 是在 componentDidMount 生命周期里发请求，仅仅只在 DOM 组件渲染挂载完毕时执行一次
// 而函数组件要模仿类组件执行的时机

// 只有 useEffect 空数组最契合 即 useEffect(() => {}, [])

### useRef

用于获取 dom 和组件实例（只有类组件，因为函数组件没有实例）。

```
function App () {
  const h1Ref = useRef(null)
  const testRef = useRef(null)
  useEffect(() => {
    console.log(h1Ref.current)
    console.log(testRef.current)
  })
  ....
```

由这段代码可知， useEffect 回调函数是在组件和 DOM 渲染完毕之后才调用的

### useContext

hooks 中使用 context

- 实现步骤

1. 使用 createContext 创建 Context 对象
2. 在顶层组件通过 Provider 提供数据
3. 在底层组件通过 useContext 函数获取数据

### hooks 使用总结

1. hooks 只在函数组件里使用
2. hooks 出现不是为了干掉 class，两者是可以共存的

- useState

1. 初始值只在第一次渲染的时候有用，再次更新数据忽略
2. useState 方法可以多次调用，供给多个状态数据使用，每次互相独立不影响
3. 每次调用 setCount 方法都会引起组件的重新渲染
4. useState 初始化方法只能放在组件的最外层使用，不能用任何代码段包裹，比如 if 语句，for 循环语句，组件内部方法语句
5. 如果初始值需要计算，可以在 useState 内部写一个回调方法返回初始值

- useEffect 用于处理函数组件的副作用
  什么是副作用？ 先回答主作用。 函数组件的主作用，就是通过修改数据渲染 UI，
  而副作用就是，除主作用以外的事情。比如：

1. 发起请求
2. 手动修改 DOM
3. localStorage 本地存储等相关操作

- useRef

- useContext

补充：

1. 如果需要提供给子类的数据是不变的、静态的 建议放在 index.js 包裹
2. 如果提供的数据需要修改，可以放在别的组件或者 app.js 进行包裹

## react-router

核心组件介绍

### BrowserRouter

作用： 包裹整个应用，一个 react 应用只需使用一次
两种常用的 router 模式： 哈希模式和 history 模式,组件分别是 HashRouter(有#) 和 BrowserRouter

### Link

作用: 指定导航链接 ，完成跳转 渲染成 a 标签

### Route

作用: 完成路由匹配

### 编程式导航

声明式 【 Link to】 vs 编程式 【调用路由方法进行路由跳转】
概念: 通过 js 编程的方式进行路由页面跳转
注: 如果在跳转时不想添加历史记录，可以添加额外参数 replace 为 true

```
navigate('/about', { replace: true } )
```

### 路由传参

1. searchParams 传参
   传参时

```
const navigate = useNavigate()
navigate('/article?id' + id)
```

接受参数时

```
const [params] = useSearchParams()
const id = params.get(id)
```

2. params 传参

传参时

```
 const navigate = useNavigate()
navigate('/about/' + id)
```

接受参数时

```
 const params = useParams()
 const id = params.id
```

### 嵌套路由

设计两个一级路由 login 和 layout
设计两个二级路由 归属与 Layout 路由下： article 和 board

### 默认路由设为 二级路由

把你要渲染的二级路由的 path=去掉， 加上 index 属性

```
  <Routes index element={<Article />}></Routes>
```

### 404 路由

当同级所有路由都没匹配到就匹配它 path=“\*” element={<notFount>}

## mobx

相当于 vuex

同类工具很多 还有三个

1. redux
2. dva
3. recoil

### mobx 优势

1. 不需要写模板代码，纯 JS 即可 简单

2. 轻松实现最优渲染

依赖自动追踪，实现最小渲染优化

3. 架构自由

可移植, 可测试

### mobx 配置环境

1. 一个 create-react-app 创建好的 React 项目环境
2. mobx 框架本身
3. 一个用来链接 mobx 和 React 的中间件

### mobx 计算属性

get:

### mobx 模块化

实现步骤

1. 拆分模块 js 文件，每个模块中定义自己独立的 state/action
2. 在 store/index.js 中导入拆分之后的模块，进行模块组合
3. 利用 React 的 context 的机制导出统一的 useStore 方法，给业务组件使用

### mobx 总结

mobx-react-lite 用于函数组件。类组件用 mobx-react

## PC react 项目见 react-pc

run eject 命令用于释放 react 的 webpack 隐藏配置文件，这个过程不可逆

也可以用三方插件，在不释放隐藏配置文件的情况下修改 webpack 配置，即使用 craco

### 使用 craco 修改路径别名

### craco，给 vscode 输入路径的时候增加提示路径功能

新增根目录 jsconfig.json 文件，填入下面代码

```
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 'react-router-dom'里一个 hooks ———— useLocation 用于获取当前路由信息（路径名称）

### antd Form 实例对象有方法 setFieldsValue 用于回填表单数据

- useState 修改的值不是同步更新的

## 项目打包

### react 中项目打包不是内置的，需要自己安装 sourceMap 包（vue 是内置的）

### 路由懒加载修改

引入两个组件

```
import { lazy, Suspense } from 'react'
```

完结撒花！ 完结学习本课程，结课于 2023 年 10 月 11 日晚上 23 时 17 分。
