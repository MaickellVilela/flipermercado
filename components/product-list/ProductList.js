import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { ListItem } from 'react-native-elements'

import { parsePrice } from '../../helpers/currency'
import UserBar from '../user-bar'

export default class ProductList extends Component {
  static navigationOptions() {
    return {
      title: 'Produtos',
    }
  }

  constructor(props) {
    super(props)

    const { navigation } = this.props

    this.state = {
      user: navigation.getParam('user'),
      products: navigation.getParam('products'),
    }

    this.renderItem = this.renderItem.bind(this)
  }

  keyExtractor(_, index) {
    return index.toString()
  }

  renderItem({ item }) {
    const { navigation } = this.props
    const { user } = this.state

    return (
      <ListItem
        button
        title={item.name}
        subtitle={parsePrice(item.price)}
        onPress={() => {
          navigation.navigate('Confirmation', {
            user,
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

ProductList.propTypes = {
  navigation: PropTypes.object.isRequired,
}
