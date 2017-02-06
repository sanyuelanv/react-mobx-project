'use strict'
import 'whatwg-fetch'
import React from 'react'
import Home from './home'
import User from './user'
import { Provider } from 'mobx-react';
import clickTimes from '../stores/clickTimesStore.js'
import fetchData from '../stores/fetchStore.js'
import {
  Router,
  Route,
  Link,
  browserHistory
} from 'react-router'
const stores = {clickTimes,fetchData}

class Component extends React.Component {
  render() {
    return (
      <Provider {...stores}>
  			<Router history={browserHistory}>
  				<Route path="/" component={Home} />
  				<Route path="/user" component={User}></Route>
  			</Router>
      </Provider>
    )
  }
}

export default Component
