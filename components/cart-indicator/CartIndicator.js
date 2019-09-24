import React, { Component } from 'react'
import { View } from 'react-native'

import { Icon, Badge } from 'react-native-elements'

export default class CartIcon extends Component {
  render() {
    const { badgeCount } = this.props

    return (
      <View>
        <Icon
          type='font-awesome'
          name='shopping-cart'
          {...this.props}
        />

        <Badge
          value={badgeCount}
          badgeStyle={{ backgroundColor: 'white', borderColor: 'white' }}
          textStyle={{ color: '#FC0A7E', fontWeight: 'bold' }}
          containerStyle={{ position: 'absolute', top: -5, right: -10 }}
        />
      </View>
    )
  }
}
