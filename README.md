# react-basic-bilibili
一个在b站学习react的基础项目，学习地址为： https://www.bilibili.com/video/BV1Z44y1K7Fj

## react 18的问题，需要删除index.js下  <React.StrictMode>严格模式节点。  

### react有两种组件  
1. 函数组件  
 函数组件有以下约定：  
* 函数首字母必须大写  
* 函数必须要有返回值，返回值为需要渲染的DOM节点组件结构  
* 组件就像HTML标签一样可以直接渲染到页面中
* 使用函数名称作为组件标签名称，该标签既可以成对出现也可以自闭合  

2. 类组件  
 类组件也有如下的规定
* 类组件名首字母也需要大写
* 类组件应当继承React.Component父类，从而获得父类的方法和属性  
* 类组件内部必须提供render方法，render方法必须有返回值，返回值是需要渲染的组件DOM结构  

#### 组件状态

能够为组件添加状态和修改状态的值  

* tips  在hooks出现之前，组件状态只能以类组件的方式表现。此时函数组件没有状态，称为无状态组件    

* 注意 在react中修改状态是和Vue不一样的，不能直接给状态赋值，而是需要通过setState方法(通过继承React.Component得到)来统一修改状态  

* React中编写组件其实就是编写原生js类或者函数  

**目前新项目已经很少人会去写类组件了** ，但是需要学习是为了应付当遇到老项目时要维护类组件的代码。  

#### React 的状态不可变

**概念： 不要直接修改状态的值，而是基于当前状态创建新的状态值**

Number类型，不能 ++1 1++ 等操作
数组不能push slice方法，新增要用 ```this.setState({ arr: [...this.state.arr, 4] })```  
数组删除要用filter方法
对象修改属性值不稚直接修改，要 ```this.setState({ obj: {...this.state.obj, name: 'yip' } })```

#### 受控表单组件  
什么是受控表单组件？ 答： input框自己的状态被React组件状态控制  

#### 什么是非受控组件？  
非受控组件就是通过手动操作dom的方式获取文本框的值，文本框的状态不受react组件的state中的状态控制，直接通过原生dom获取输入框的值

* 实现步骤  
1. 导入createRef 函数  
2. 调用createRef函数，创建一个ref对象，存储到名为msgRef的实例属性中  
3. 为input添加ref属性，值为msgRef  
4. 在按钮的事件处理程序中，通过msgRef.current即可拿到input对应的dom元素，而其中msgRef.current.value拿到的就是文本框的值 

### React组件通信

#### 组件通信的意义  
组件是独立且封闭的单元，默认情况下组件只能使用自己的数据（state）  
组件化开发的过程中，完整的功能会拆分多个组件，在这个过程中不可避免的需要互相传递一些数据  
为了能让各组件之间可以进行互相沟通，数据传递，这个过程就是组件通信  

1. 父子关系 -  最重要的  
2. 兄弟关系 -  自定义事件模式产生技术方法 eventBus  /  通过共同的父组件通信  
3. 其它关系 -  mobx / redux / zustand  / 基于hook的方案

* 父传子实现  
目标任务:   实现父子通信中的父传子，把父组件中的数据传给子组件  

实现步骤  
1.  父组件提供要传递的数据  -  state   
2.  给子组件标签添加属性值为 state中的数据   
3.  子组件中通过 props 接收父组件中传过来的数据   
  a. 类组件使用this.props获取props对象  
  b. 函数式组件直接通过参数获取props对象  

#### props说明
目标任务:   知道props传递时的一些注意事项
1.  props是只读对象（readonly） 与vue一样
根据单项数据流的要求，子组件只能读取props中的数据，不能进行修改
2. props可以传递任意数据
数字、字符串、布尔值、数组、对象、**函数、JSX(等于vue里面的插槽传递)**

#### 子传父实现

* 口诀： 父组件给子组件传递回调函数，子组件调用 核心是父组件给子组件传递方法

#### 兄弟组件通信

弟传父，父传兄

#### 爷孙，曾重孙组件通信

类似Vue 2.7版本出的provide和inject

* 实现步骤  
1. 创建Context对象 导出 Provider 和 Consumer对象   

```
const { Provider, Consumer } = createContext()
```  
2. 使用Provider包裹上层组件提供数据   

```
<Provider value={this.state.message}>  
    {/* 根组件 */}
</Provider>  
```
 
3. 需要用到数据的组件使用Consumer包裹获取数据   
```
<Consumer >
    {value => /* 基于 context 值进行渲染*/}
</Consumer>
```  

### React组件进阶

children属性是什么
表示该组件的子节点，只要组件内部有子节点，props中就有该属性
children可以是什么
1. 普通文本
2. 普通标签元素
3. 函数 / 对象
4. JSX

#### React props校验规则 （此处省略） 要写的时候再看文档补吧


### React生命周期

* 只有类组件有生命周期，函数组件没有
react版本16.4前后生命周期不一样

#### 生命周期 -  挂载阶段
顺序
constructor -> render -> componentDidMount  

constructor： 初始化阶段只执行一次  
render： 只要组件渲染或者重新渲染都会执行; 作用：渲染UI（千万不要在render里面调用setState，会死循环）  
componentDidMount: 组件挂载（完成DOM渲染）后执行，初始化的时候只试行一次；作用：发请求和DOM操作  

#### 生命周期 -  更新阶段
顺序
render -> componentDidUpdate
每次更新阶段都会执行以上一次

componentDidUpdate 触发时机： 组件更新后（DOM渲染完毕）；  作用： DOM操作。获取DOM更新后的内容，**不要调用setState**

#### 生命周期 - 卸载阶段

componentWillUnmount 触发时机： 组件卸载（从页面上消失）  作用：执行清理工作（比如清理定时器）

## hooks

1. 什么是hooks
Hooks的本质：一套能够使函数组件更强大，更灵活的“钩子”  

React体系里组件分为 类组件 和 函数组件  
经过多年的实战，函数组件是一个更加匹配React的设计理念 UI = f(data)，也更有利于逻辑拆分与重用的组件表达形式，**而先前的函数组件是不可以有自己的状态的，为了能让函数组件可以拥有自己的状态，所以从react v16.8开始，Hooks应运而生**

注意点：  
1. 有了hooks之后，为了兼容老版本，class类组件并没有被移除，俩者都可以使用  
2. 有了hooks之后，不能在把函数成为无状态组件了，因为hooks为函数组件提供了状态  
3. hooks只能在函数组件中使用(类组件使用会报错)  

2. Hooks解决了什么问题  
Hooks的出现解决了俩个问题    1. 组件的状态逻辑复用  2.class组件自身的问题  
1.  组件的逻辑复用
在hooks出现之前，react先后尝试了 mixins混入，HOC高阶组件，render-props等模式  
但是都有各自的问题，比如mixin的数据来源不清晰，高阶组件的嵌套问题等等   
2.  class组件自身的问题  
class组件就像一个厚重的‘战舰’ 一样，大而全，提供了很多东西，有不可忽视的学习成本，比如各种生命周期，this指向问题等等，而我们更多时候需要的 是一个轻快灵活的'快艇'   

### useState使用  

```[name, setName] = useState(value)```
* 数组内的属性名可以自定义，但是顺序不能改变，value是属性的初始值

* setName函数不能直接修改name的原值，只能生成一个新值替换原值

### hooks 函数组件的更新过程

函数组件使用 useState hook 后的执行过程，以及状态值的变化

* ● 组件第一次渲染 
  a. 从头开始执行该组件中的代码逻辑
  b. 调用 useState(0) 将传入的参数作为状态初始值，即：0
  c. 渲染组件，此时，获取到的状态 count 值为： 0
* ● 组件第二次渲染 
  a. 点击按钮，调用 setCount(count + 1) 修改状态，因为状态发生改变，所以，该组件会重新渲染
  b. 组件重新渲染时，会再次执行该组件中的代码逻辑
  c. 再次调用 useState(0)，此时 React 内部会拿到最新的状态值而非初始值，比如，该案例中最新的状态值为 1
  d. 再次渲染组件，此时，获取到的状态 count 值为：1

**注意：useState 的初始值(参数)只会在组件第一次渲染时生效。**也就是说，以后的每次渲染，useState 获取到都是最新的状态值，React 组件会记住每次最新的状态值

### useState使用规则
1. useState可以执行多次，每次都是绑定一对相互独立，互不影响
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
  a.  只能出现在函数组件或者其他hook函数中   
  b.  不能嵌套在if/for/其它函数中（react按照hooks的调用顺序识别每一个hook）   

3. useState 回调函数的参数  

* 使用场景  

参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过计算才能获得，则可以传入一个函数，在函数中计算并返回初始的 state，**此函数只在初始渲染时被调用**  


### useEffect

1. 理解函数副作用


什么是副作用? 
副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于 React 组件来说，主作用就是根据数据（state/props）渲染 UI，除此之外都是副作用（比如，手动修改 DOM）

常见的副作用
1. 数据请求 ajax发送
2. 手动修改dom
3. localstorage操作

useEffect函数的作用就是为react函数组件提供副作用处理的！  
像vue3的watchEffect  

1. 不添加依赖项(默认状态)  

组件首次渲染执行一次，以及不管是哪个状态更改引起组件更新时都会重新执行  
1. 组件初始渲染  
2. 组件更新 （不管是哪个状态引起的更新）  


2. 添加空数组  
组件只在首次渲染时执行一次  

3. 添加特定依赖项  
副作用函数在首次渲染时执行，在依赖项发生变化时重新执行  

* 注意事项
useEffect 回调函数中用到的数据（比如，count）就是依赖数据，就应该出现在依赖项数组中，如果不添加依赖项就会有bug出现  

4. 清理副作用
如果想要清理副作用 可以在副作用函数中的末尾return一个新的函数，在新的函数中编写清理副作用的逻辑
注意执行时机为：
1. 组件卸载时自动执行
2. 组件更新时，下一个useEffect副作用函数执行之前自动执行

5. 函数组件发起请求  

// 回忆类组件是如何发请求的
// 是在componentDidMount生命周期里发请求，仅仅只在DOM组件渲染挂载完毕时执行一次
// 而函数组件要模仿类组件执行的时机

// 只有useEffect空数组最契合 即 useEffect(() => {}, [])

### useRef

用于获取dom和组件实例（只有类组件，因为函数组件没有实例）。
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
由这段代码可知， useEffect回调函数是在组件和DOM渲染完毕之后才调用的

### useContext  
hooks中使用context  
* 实现步骤  
1. 使用createContext 创建Context对象  
2. 在顶层组件通过Provider 提供数据  
3. 在底层组件通过useContext函数获取数据  



### hooks使用总结
1. hooks只在函数组件里使用
2. hooks出现不是为了干掉class，两者是可以共存的

* useState
1. 初始值只在第一次渲染的时候有用，再次更新数据忽略
2. useState方法可以多次调用，供给多个状态数据使用，每次互相独立不影响
3. 每次调用setCount方法都会引起组件的重新渲染
4. useState初始化方法只能放在组件的最外层使用，不能用任何代码段包裹，比如if语句，for循环语句，组件内部方法语句  
5. 如果初始值需要计算，可以在useState内部写一个回调方法返回初始值

* useEffect 用于处理函数组件的副作用
什么是副作用？  先回答主作用。 函数组件的主作用，就是通过修改数据渲染UI，
而副作用就是，除主作用以外的事情。比如：  
1. 发起请求
2. 手动修改DOM
3. localStorage 本地存储等相关操作

* useRef


* useContext

补充：  
1. 如果需要提供给子类的数据是不变的、静态的 建议放在index.js包裹
2. 如果提供的数据需要修改，可以放在别的组件或者app.js进行包裹
