'use strict'
import React from 'react'
import style from './css.css'
import { observer,inject } from 'mobx-react'
@inject("loadStore") @observer class Component extends React.Component {
  constructor(props) {
    super(props)
  }
  _renderLoad(){
    let {loadStore} = this.props
    let loadStyle = style.loadHide
    if(loadStore.state){loadStyle =  style.loadShow}
    return loadStyle
  }
  componentWillMount() {}
  render() {
    return (
      <div className={this._renderLoad()} >
        <div className={style.loadTop}>
          <div className={style.loadTopBlue}></div>
        </div>
      </div>
    )
  }
}
export default Component
