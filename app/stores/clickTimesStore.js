'use strict'
import { observable, action } from 'mobx'

// 点击次数
class ClickTimesStore {
  @observable times;
  @action click = (Increment) => {
    this.times += Increment
  }
  constructor () {
    this.times = 0
  }
}
const clickTimes = new ClickTimesStore()

export default clickTimes
