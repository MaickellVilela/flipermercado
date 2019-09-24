import React, { Component } from 'react'
import { Platform, Image, StyleSheet } from 'react-native'

import { UserList, Splash } from './components'

import { fetchUsers, fetchProducts } from './helpers/actions'

import logo from './assets/logo.png'

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam('isLoading')) {
      return { header: null }
    }

    return {
      title: 'Flipermercado',
      headerLeft: (<Image style={styles.stretch} source={logo} />),
    }
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

const styles = StyleSheet.create({
  stretch: {
    width: 45,
    height: 50,
    margin: 20,
    resizeMode: 'stretch',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  }
})
