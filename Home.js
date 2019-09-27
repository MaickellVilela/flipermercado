import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Splash, UserList } from './components'
import { fetchProducts, fetchUsers } from './helpers/actions'

export default class Home extends Component {
  static navigationOptions({ navigation }) {
    if (navigation.getParam('isLoading')) {
      return { header: null }
    }

    return { title: 'Flipermercado' }
  }

  async componentWillMount() {
    const { navigation } = this.props
    const { products } = await fetchProducts()
    const users = await fetchUsers()

    navigation.setParams({
      isLoading: false,
      users,
      products,
    })
  }

  isLoading() {
    const { navigation } = this.props

    return navigation.getParam('isLoading')
  }

  render() {
    const { navigation } = this.props

    return this.isLoading() ? <Splash /> : <UserList navigation={navigation} />
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
}
