'use strict'
import React from 'react'
import Loading from './loading'
import Error from '../error'

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = {Component: AsyncComponent.Component}

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({Component})
        })
      }
    }
    render() {
      const {Component} = this.state
      if (Component) {
        if(Component == 101){
          return <Error { ...this.props} text={"加载页面失败"} error={101} />
        }
        else{
          return <Component { ...this.props} />
        }
      }
      return (<Loading />)
    }
  }
}

export default asyncComponent
