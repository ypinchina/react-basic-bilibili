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
