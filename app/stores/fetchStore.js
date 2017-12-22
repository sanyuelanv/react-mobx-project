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
    let fetchURL = '/api/v1/topics'
    fetch(fetchURL, {method: 'get'})
      .then(res => res.json())
      .then(
        action("fetchOperate_success",(res) => {
          let {data} = res
          this.state = 2
          this.data = `加载${data.length}条数据`
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
