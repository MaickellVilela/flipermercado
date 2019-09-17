import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { ListItem } from 'react-native-elements'
import axios from 'axios';

import { parsePrice } from '../../helpers/currency'

export default class ProductList extends Component {
  keyExtractor = (_, index) => index.toString()

  renderItem = ({ item }) => {
    const userName = this.props.navigation.getParam('userName')

    return (
      <ListItem
        button
        title={item[0]}
        subtitle={ parsePrice(item[1]) }
        onPress={() => {
          this.props.navigation.navigate('Confirmation', {
            userName: userName,
            productName: item[0],
            productPrice: item[1],
          })
        }}
      />
    )
  }

  render() {
    const { navigation } = this.props
    const products = navigation.getParam('products')

    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={products}
        renderItem={this.renderItem}
      />
    )
  }
}
