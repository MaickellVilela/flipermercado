import React, { Component } from 'react'
import { UserList, Splash } from './components'

import { fetchUsers, fetchProducts } from './helpers/actions'

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam('isLoading')) {
      return { header: null }
    }

    return { title: 'Flipermercado' }
  }

  isLoading = () => this.props.navigation.getParam('isLoading')

  async componentWillMount() {
    const users = await fetchUsers()
    const products = await fetchProducts()

    this.props.navigation.setParams({
      isLoading: false,
      users: users,
      products: products
    })
  }

  render = () => (
    this.isLoading() ? (
      <Splash />
    ) : (
      <UserList navigation={this.props.navigation} />
    )
  )
}
