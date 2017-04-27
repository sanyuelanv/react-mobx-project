'use strict'
import 'whatwg-fetch'
import React from 'react'
import { Provider } from 'mobx-react';
import {Route,BrowserRouter,Switch} from 'react-router-dom'

import Home from './home'
import Nav from '../common/component/nav'
import asyncComponent from '../config/asyncComponent'
import commonStyle from '../common/css/css.css'
import stores from '../stores'

const userRouter = asyncComponent(() => System.import('./user/index').then(module => module.default))

class Component extends React.Component {
  render() {
    return (
      <Provider {...stores}>
  			<BrowserRouter>
          <div className ={commonStyle.container}>
            <Switch>
    				   <Route exact path="/" component={Home}></Route>
               <Route exact path="/user" component={userRouter}></Route>
            </Switch>
             <Nav />
          </div>
  			</BrowserRouter>
      </Provider>
    )
  }
}

export default Component
