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