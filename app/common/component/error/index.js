'use strict'
import React from 'react'
import style from './css.css'
class Error extends React.Component {
  _handleBack = this._handleBack.bind(this)
  _handleRef = this._handleRef.bind(this)
  static propTypes = {
    history: PropTypes.object,
    error: PropTypes.object,
    text: PropTypes.String
  }
  _handleBack () {
    const { history } = this.props
    history.goBack()
  }
  _handleRef () {
    window.location.reload()
  }
  _renderBtn () {
    const state = this.props.error.state || 404
    if (state === 101) {
      return (
        <div className={style.backButton} onClick={this._handleRef}>刷新</div>
      )
    }
  }
  render () {
    const text = this.props.text || '404找不到页面'
    return (
      <div className={style.errorBox}>
        <div className={style.ErrorText}>{text}</div>
        <div className={style.ErrorButton}>
          <div className={style.backButton} onClick={this._handleBack}>返回上一页</div>
          {this._renderBtn()}
        </div>
      </div>
    )
  }
}

export default Error
