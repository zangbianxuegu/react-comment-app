import React, { Component } from 'react'
import Header from './Header'
import Clock from './Clock'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
  constructor() {
    super()
    this.state = {
      isShowHeader: true,
      isShowClock: true,
      comments: [],
    }
  }
  handleHeader() {
    this.setState({
      isShowHeader: !this.state.isShowHeader,
    })
  }
  handleClock() {
    this.setState({
      isShowClock: !this.state.isShowClock,
    })
  }
  handleSubmitCommet(comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    this.state.comments.push(comment)
    this.setState({
      comments: this.state.comments,
    })
  }
  render() {
    return (
      <div className="wrapper">
        <div>
          {this.state.isShowHeader ? <Header /> : null}
          <button onClick={this.handleHeader.bind(this)}>
            显示或者隐藏标题
          </button>
        </div>
        <div>
          {this.state.isShowClock ? <Clock /> : null}
          <button onClick={this.handleClock.bind(this)}>
            显示或隐藏时钟
          </button>
        </div>
        <CommentInput onSubmit={this.handleSubmitCommet.bind(this)} />
        <CommentList comments={this.state.comments} />
      </div>
    )
  }
}

export default CommentApp
