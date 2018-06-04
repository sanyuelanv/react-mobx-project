'use strict'
import React from 'react'
import { render } from 'react-dom'
import App from './router'
import 'babel-polyfill'
import 'whatwg-fetch'

const main = function () {
  render(<App />, document.getElementById('main'))
}
window.onload = function () {
  main()
}
