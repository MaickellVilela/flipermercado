import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'

import { parsePrice } from '../../helpers/currency'

export default class ProductList extends Component {
  static navigationOptions() {
    return {
      title: 'Produtos',
    }
  }

  constructor(props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
  }

  keyExtractor(_, index) {
    return index.toString()
  }

  renderItem({ item }) {
    const { navigation } = this.props
    const userName = navigation.getParam('userName')

    return (
      <ListItem
        button
        title={item[0]}
        subtitle={parsePrice(item[1])}
        onPress={() => {
          navigation.navigate('Confirmation', {
            userName,
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

ProductList.propTypes = {
  navigation: PropTypes.object.isRequired,
}
