import React, { Component } from 'react'
import { UserList, Splash } from './components'

import { fetchUsers, fetchProducts } from './helpers/actions'

export default class Home extends Component {
  static navigationOptions({ navigation }) {
    if (navigation.getParam('isLoading')) {
      return { header: null }
    }

    return { title: 'Flipermercado' }
  }

  async componentWillMount() {
    const users = await fetchUsers()
    const { products } = await fetchProducts()

    this.props.navigation.setParams({
      isLoading: false,
      users,
      products,
    })
  }

  isLoading() { return this.props.navigation.getParam('isLoading') }

  render() {
    return (
      this.isLoading() ? (
        <Splash />
      ) : (
        <UserList navigation={this.props.navigation} />
      )
    )
  }
}
