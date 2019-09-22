import React, { Component } from 'react'
import { FlatList, View } from 'react-native'

import { ListItem } from 'react-native-elements'
import { UserBar } from '../../components'

import { parsePrice } from '../../helpers/currency'

export default class ProductList extends Component {
  constructor(props) {
    super(props)

    const { navigation } = this.props

    this.state = {
      user: navigation.getParam('user'),
      products: navigation.getParam('products')
    }
  }
  keyExtractor = (_, index) => index.toString()

  renderItem = ({ item }) => {
    return (
      <ListItem
        button
        title={item.name}
        subtitle={ parsePrice(item.price) }
        onPress={() => {
          this.props.navigation.navigate('Confirmation', {
            user: this.state.user,
            product: item,
          })
        }}
      />
    )
  }

  render() {
    const { user, products } = this.state

    return (
      <View>
        <UserBar user={user} />

        <FlatList
          keyExtractor={this.keyExtractor}
          data={products}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
