import './index.css'
import avatar from './images/avatar.png'
import React, { createRef } from 'react'

// 时间格式化
function formatDate (time) {
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
}

class App extends React.Component {
  textareaVal = createRef()
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot'
      },
      {
        id: 2,
        name: '时间',
        type: 'time'
      }
    ],
    active: 'hot',
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1
      }
    ]
  }
  selectCommentsType = (item) => {
    this.setState({
      active: item.type
    })
  }
  deleteComment = (item) => {
    this.setState({
      list: this.state.list.filter(i => i.id != item.id)
    })
  }
  submitComments = () => {
    const newComment = {
      id: 4,
      author: '陈永仁',
      comment: this.textareaVal.current.value,
      time: new Date(),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 0
    }
    this.setState({
      list: [...this.state.list, newComment]
    })
  }
  render () {
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>{this.state.list.length} 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {
                this.state.tabs.map(tab => (
                  <li
                    key={tab.id}
                    className={tab.type === this.state.active ? 'on' : ''}
                    onClick={() => this.selectCommentsType(tab)}
                  >按{tab.name}排序</li>
                ))
              }
            </ul>
          </div>

          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                ref={this.textareaVal}
                placeholder="发条友善的评论"
                className="ipt-txt"
              />
              <button className="comment-submit" onClick={this.submitComments}>发表评论</button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {
              this.state.list.map(item => (
                <div className="list-item" key={item.id}>
                  <div className="user-face">
                    <img className="user-head" src={avatar} alt="" />
                  </div>
                  <div className="comment">
                    <div className="user">{item.author}</div>
                    <p className="text">{item.comment}</p>
                    <div className="info">
                      <span className="time">{formatDate(item.time)}</span>
                      <span className={item.attitude === 1 ? 'like liked' : 'like'}>
                        <i className="icon" />
                      </span>
                      <span className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                        <i className="icon" />
                      </span>
                      <span className="reply btn-hover" onClick={() => this.deleteComment(item)}>删除</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>)
  }
}


export default App
