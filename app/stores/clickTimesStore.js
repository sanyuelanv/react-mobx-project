'use strict'
import { observable,action } from 'mobx'

// 点击次数
class clickTimesStore {
  @observable times;
  @action click = (Increment)=>{
    this.times += Increment
  }
  constructor(){
    this.times = 0
  }
}
const clickTimes = new clickTimesStore()

export default clickTimes
