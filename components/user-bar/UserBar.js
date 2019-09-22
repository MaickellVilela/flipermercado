import React, { Component } from 'react'
import { View } from 'react-native'

import { ListItem, Badge } from 'react-native-elements'

import { parsePrice } from '../../helpers/currency'

export default class UserBar extends Component {
  render() {
    const { user } = this.props

    return (
      <ListItem
        leftAvatar={{
          title: user.name,
          source: { uri: user.avatar },
        }}
        rightElement={() => <Badge value={parsePrice(user.balance * -1)} status='primary' />}
        title={user.name}
        bottomDivider
      />
    )
  }
}
