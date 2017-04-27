'use strict'
import React from 'react'
import style from './css.css'

class Loading extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
			<div className={style.loading}></div>
    )
  }
}

export default Loading
