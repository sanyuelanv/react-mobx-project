'use strict'
import 'whatwg-fetch'
import React from 'react'
import { Provider } from 'mobx-react';
import {Route,BrowserRouter,Switch} from 'react-router-dom'

import Home from './home'
import Nav from '../common/component/nav'
import Load from '../common/component/load'
import Error from '../common/component/error'
import asyncComponent from '../common/component/async'
import commonStyle from '../common/css/css.css'
import stores from '../stores'
const userRouter = asyncComponent(() => import('./user/index').then(module => module.default).catch((err)=>{return 101}))

class Component extends React.Component {
  render() {
    return (
      <Provider {...stores}>
  			<BrowserRouter>
          <div className ={commonStyle.container}>
            <Switch>
    				   <Route exact path="/" component={Home}></Route>
               <Route exact path="/user" component={userRouter}></Route>
               <Route component={Error} ></Route>
            </Switch>
            <Nav />
            <Load />
          </div>
  			</BrowserRouter>
      </Provider>
    )
  }
}

export default Component
