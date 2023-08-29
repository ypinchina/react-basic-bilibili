// 框架核心包
import React from 'react';
// react渲染相关
import ReactDOM from 'react-dom/client';
// 全局样式文件
import './index.css';
// 根组件文件
import App from './App';

//  创建一个根组件把APP放到组件中，并把这个组件放到pulic/index.html文件下id为root的DOM的节点下
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)
