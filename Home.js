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
    const { props } = this
    const users = await fetchUsers()
    const { products } = await fetchProducts()

    props.navigation.setParams({
      isLoading: false,
      users,
      products,
    })
  }

  isLoading() {
    const { props } = this

    return props.navigation.getParam('isLoading')
  }

  render() {
    const { props } = this

    return this.isLoading() ? (
      <Splash />
    ) : (
      <UserList navigation={props.navigation} />
    )
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
}
