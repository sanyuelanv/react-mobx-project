'use strict'
import React from 'react'

import commonStyle from '../../common/css/css.css'
import style from './css.css'
import Nav from '../../common/component/nav'
import { observer,inject } from 'mobx-react'

@inject('fetchData') @observer class Component extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		console.log(this.props)
	}
	_addHandle(){
		let {fetchOperate} = this.props.fetchData
		fetchOperate()
	}
	_renderData(){
		let {data,state} = this.props.fetchData
		if(state == 0){
			return("点击发送请求")
		}
		else if(state == 1){
			return("正在请求")
		}
		else if(state == 2 && data != null){
			return(data)
		}
		else if(state == -1){
			return("请求出错")
		}
	}
	render(){
    return(
			<div className ={commonStyle.container}>
				<div className={commonStyle.content} onClick={()=>{this._addHandle()}}>{this._renderData()}</div>
				<Nav />
			</div>
		)
	}
}


export default Component
