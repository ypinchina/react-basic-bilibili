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