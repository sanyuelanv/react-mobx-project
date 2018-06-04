'use strict'
import {
  observable,
  action
} from 'mobx'

// 请求
class FetchDataStore {
  @observable data;
  @observable state;
  @action fetchOperate = (Increment) => {
    this.state = 1
    const fetchURL = '/api/v1/topics'
    fetch(fetchURL, { method: 'get' })
      .then(res => res.json())
      .then(
        action('fetchOperate_success', (res) => {
          const { data } = res
          this.state = 2
          this.data = `加载${data.length}条数据`
        })
      )
      .catch(
        action('fetchOperate_error', (err) => {
          this.state = -1
          return err
        })
      )
  }
  constructor () {
    this.data = null
    this.state = 0
  }
}
const fetchData = new FetchDataStore()

export default fetchData
