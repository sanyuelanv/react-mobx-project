'use strict'
import React from 'react'
import style from './css.css'
import { IndexLink } from 'react-router'

class Component extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
    	return(
            <div className={style.nav}>
                <IndexLink to='/' activeClassName={style.navBtnActive} className={style.navBtnUnActive}>首页</IndexLink>
				<IndexLink to='/user' activeClassName={style.navBtnActive} className={style.navBtnUnActive}>用户</IndexLink>
            </div>
        )
	}
}

export default Component
