import React, { Component } from 'react'
import { UserList } from './components'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <UserList navigation={this.props.navigation} />
    )
  }
}
