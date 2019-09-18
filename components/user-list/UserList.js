import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'

import { fetchUsers, fetchProducts } from '../../helpers/actions'

export default class UserList extends Component {
  constructor(props) {
    super(props)

    this.state = { users: [], products: [] }
  }

  async componentDidMount() {
    const { users } = await fetchUsers()

    const { products } = await fetchProducts()

    this.setState({ users, products })
  }

  keyExtractor = (_, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      button
      title={item[0]}
      onPress={() => {
        this.props.navigation.navigate('ProductList', {
          userName: item[0],
          products: this.state.products,
        })
      }}
    />
  )

  render() {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.users}
        renderItem={this.renderItem}
      />
    )
  }
}
