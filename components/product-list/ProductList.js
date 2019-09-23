import React, { Component } from 'react'
import { FlatList, View } from 'react-native'

import { ListItem, Button } from 'react-native-elements'
import { UserBar } from '../../components'

import { parsePrice } from '../../helpers/currency'

export default class ProductList extends Component {
  constructor(props) {
    super(props)

    const { navigation } = this.props

    this.state = {
      cart: [],
      user: navigation.getParam('user'),
      products: navigation.getParam('products')
    }
  }

  keyExtractor = (_, index) => index.toString()

  addProductToCart = (product) => this.state.cart.push(product)

  renderItem = ({ item }) => {
    return (
      <ListItem
        button
        title={item.name}
        subtitle={ parsePrice(item.price) }
        onPress={() => this.addProductToCart(item)}
      />
    )
  }

  render() {
    const { user, products, cart } = this.state

    return (
      <View style={{ flex: 1 }}>
        <UserBar user={user} />

        <FlatList
          keyExtractor={this.keyExtractor}
          data={products}
          renderItem={this.renderItem}
        />

        <Button
          title="Continuar"
          onPress={() => {
            this.props.navigation.navigate('Confirmation', {
              user: user,
              cart: cart,
            })
          }}
        />
      </View>
    )
  }
}
