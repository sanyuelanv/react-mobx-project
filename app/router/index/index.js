'use strict'
import React from 'react'
// 公用属性
import commonStyle from '../../common/css/css.css'
import Bar from '../../common/component/bar'

class Component extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){}
	render(){
    	return(
			<div className ={commonStyle.container}>
				{this.props.children}
				<Bar></Bar>
			</div>
		)
	}
}
export default Component
