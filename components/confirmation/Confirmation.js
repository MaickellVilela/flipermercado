import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Alert } from 'react-native'
import { Button } from 'react-native-elements'

import { createTransaction } from '../../helpers/actions'
import { currentDate } from '../../helpers/time'
import styles from './styles'

export default class Confirmation extends Component {
  constructor(props) {
    super(props)

    this.state = { isActivityIndicatorAnimating: false }
  }

  render() {
    const { navigation } = this.props

    const userName = navigation.getParam('userName')
    const productName = navigation.getParam('productName')
    const productPrice = navigation.getParam('productPrice')

    const handleConfirm = async () => {
      this.setState({ isActivityIndicatorAnimating: true })

      try {
        await createTransaction({
          payload: {
            created_at: currentDate(),
            user: userName,
            product: productName,
            price: productPrice,
          }
        })

        Alert.alert(`Compra efetuada.\nObrigado, ${userName}! 🥳`)
      } catch (error) {
        Alert.alert(`Ocorreu um erro ao confirmar a compra. 🤕`)

        console.error(error)
      } finally {
        this.setState({ isActivityIndicatorAnimating: false })

        this.props.navigation.popToTop()
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text>{ userName }</Text>
          <Text>{ productName }</Text>
          <Text>{ productPrice }</Text>
        </ScrollView>
        <View style={ styles.whiteOverlay }>
          <ActivityIndicator animating={ this.state.isActivityIndicatorAnimating } size='large' />
        </View>
        <View>
          <Button
            type="outline"
            title="Cancelar"
            onPress={ () => this.props.navigation.popToTop() }
          />

          <Button
            title="Confirmar"
            onPress={ handleConfirm }
          />
        </View>
      </View>
    )
  }
}
