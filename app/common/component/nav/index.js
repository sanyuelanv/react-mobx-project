'use strict'
import React from 'react'
import style from './css.css'
import {NavLink} from 'react-router-dom'

class Nav extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
			<div className={style.nav}>
				<NavLink exact to='/' activeClassName={style.navBtnActive} className={style.navBtnUnActive}>首页</NavLink>
				<NavLink exact to='/user' activeClassName={style.navBtnActive} className={style.navBtnUnActive}>用户</NavLink>
			</div>
    )
  }
}

export default Nav
