'use strict'
import React from 'react'
import commonStyle from '../../common/css/css.css'

class NotFound extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
			<div className={commonStyle.content}>找不到页面</div>
    )
  }
}

export default NotFound
