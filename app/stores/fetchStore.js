'use strict'
import {
  observable,
  action
} from 'mobx'

// 请求
class fetchDataStore {
  @observable data;
  @observable state;
  @action fetchOperate = (Increment) => {
    this.state = 1
    let fetchURL = 'http://localhost:3000/'
    fetch(fetchURL, {method: 'get'})
      .then(res => res.json())
      .then(
        action("fetchOperate_success",(res) => {
          let {test} = res
          this.state = 2
          this.data = test
        })
      )
      .catch(
        action("fetchOperate_error",(err) => {
          this.state = -1
        })
      )
  }
  constructor() {
    this.data = null
    this.state = 0
  }
}
const fetchData = new fetchDataStore()

export default fetchData
