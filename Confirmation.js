import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native'

import { Button } from 'react-native-elements'

export default class Confirmation extends Component {
  render() {
    const { navigation } = this.props

    const userName = navigation.getParam('userName')
    const productName = navigation.getParam('productName')
    const productPrice = navigation.getParam('productPrice')

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text>{userName}</Text>
          <Text>{productName}</Text>
          <Text>{productPrice}</Text>
        </ScrollView>
        <View>
          <Button
            type="outline"
            title="Cancelar"
            onPress={() => this.props.navigation.popToTop()}
          />

          <Button title="Confirmar" />
        </View>
      </View>
    )
  }
}
