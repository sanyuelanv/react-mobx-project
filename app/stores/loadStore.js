'use strict'
import { observable,action } from 'mobx'

//
class LoadStore {
  @observable state;
  @action control =(state)=>{
    this.state = state
  }
  constructor(){
    this.state = false
  }
}
const loadStore = new LoadStore()

export default loadStore
