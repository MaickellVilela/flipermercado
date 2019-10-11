import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  FlatList, Text, TouchableOpacity, View
} from 'react-native'
import { Avatar } from 'react-native-elements'

import styles from './styles'

export default class UserList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: props.navigation.getParam('users'),
      products: props.navigation.getParam('products'),
    }

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem({ item }) {
    const { navigation } = this.props
    const { products } = this.state

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('ProductList', {
            user: item,
            products,
          })
        }}
      >
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            size={120}
            source={{
              uri: item.avatar,
            }}
          />
          <Text style={styles.nameLabel}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { users } = this.state

    return (
      <FlatList
        data={users}
        numColumns={3}
        keyExtractor={users.name}
        renderItem={this.renderItem}
      />
    )
  }
}

UserList.propTypes = {
  navigation: PropTypes.object.isRequired,
}
