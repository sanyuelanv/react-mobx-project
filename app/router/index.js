'use strict'
import 'whatwg-fetch'
import React from 'react'
import Home from './home'
import Index from './index/'
// import User from './user'
import { Provider } from 'mobx-react';
import clickTimes from '../stores/clickTimesStore.js'
import fetchData from '../stores/fetchStore.js'
import {
  IndexRoute,
  Router,
  Route,
  Link,
  browserHistory
} from 'react-router'
const stores = {clickTimes,fetchData}

const userRouter = (location,callback)=>{
  require.ensure([],require=>{
    callback(null,require('./user/index').default)
  },"user")
}

class Component extends React.Component {
  render() {
    return (
      <Provider {...stores}>
  			<Router history={browserHistory}>
  				<Route path="/" component={Index}>
            <IndexRoute component={Home} />
            <Route path="user" getComponent={userRouter}></Route>
          </Route>
  			</Router>
      </Provider>
    )
  }
}

export default Component
