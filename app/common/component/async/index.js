'use strict'
import React from 'react'
import Loading from './loading'

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
      if (Component) {return <Component { ...this.props} />}
      console.log(Component);
      return (<Loading />)
    }
  }
}

export default asyncComponent
