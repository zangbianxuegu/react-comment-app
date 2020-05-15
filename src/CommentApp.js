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
  componentWillMount() {
    this._loadComments()
  }
  _loadComments() {
    let comments = localStorage.getItem('comments')
    if (comments) {
      comments = JSON.parse(comments)
      this.setState({ comments })
    }
  }
  _saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
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
    let comments = this.state.comments
    comments.push(comment)
    this.setState({
      comments,
    })
    this._saveComments(comments)
  }
  handleDeleteComment(index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
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
          <button onClick={this.handleClock.bind(this)}>显示或隐藏时钟</button>
        </div>
        <CommentInput onSubmit={this.handleSubmitCommet.bind(this)} />
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)}
        />
      </div>
    )
  }
}

export default CommentApp
