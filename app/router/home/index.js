'use strict'
import React from 'react'

import style from './css.css'
// 公用属性
import commonStyle from '../../common/css/css.css'
import Nav from '../../common/component/nav'
import { observer,inject } from 'mobx-react'


@inject('clickTimes') @observer class Component extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){}
	_addHandle(num){
		this.props.clickTimes.click(1)
	}
	render(){
    	return(
				<div className ={commonStyle.container}>
					<div className={commonStyle.content} onClick={()=>{this._addHandle(1)}}> 点击次数：{this.props.clickTimes.times}</div>
					<Nav />
				</div>
		)
	}
}
export default Component
