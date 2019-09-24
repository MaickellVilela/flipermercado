import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'

import { Badge, Button, Icon, Header, ListItem, withBadge } from 'react-native-elements'
import FlashMessage, { showMessage } from "react-native-flash-message";

import { CartIndicator, UserBar } from '../../components'

import { parsePrice } from '../../helpers/currency'

export default class ProductList extends Component {
  static navigationOptions = {
    title: 'Produtos',
  }

  constructor(props) {
    super(props)

    const { navigation } = this.props

    this.state = {
      cart: [],
      user: navigation.getParam('user'),
      products: navigation.getParam('products')
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ cart: [] })
  }

  keyExtractor = (_, index) => index.toString()

  addProductToCart = (product) => {
    const { navigation } = this.props
    const selectedProducts = navigation.getParam('cart', [])

    selectedProducts.push(product)

    navigation.setParams({ cart: selectedProducts })

    showMessage({
      message: 'Item adicionado ao carrinho!',
      backgroundColor: '#FC0A7E',
      color: 'white',
      fontWeight: 'bold',
    })
  }

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
    const { navigation } = this.props
    const { user, products } = this.state

    const cart = navigation.getParam('cart', [])

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
          icon={
            <CartIndicator
              badgeCount={cart.length}
              size={20}
              color='white'
            />
          }
          onPress={() => {
            navigation.navigate('Confirmation', {
              user: user,
              cart: cart,
            })
          }}
          iconRight
        />

        <FlashMessage position="bottom" />
      </View>
    )
  }
}
