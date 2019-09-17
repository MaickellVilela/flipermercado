import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Alert } from 'react-native'
import { Button } from 'react-native-elements'

import { createTransaction } from '../../helpers/actions'
import { currentDate } from '../../helpers/time'
import { parsePrice } from '../../helpers/currency'
import styles from './styles'

export default class Confirmation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isActivityIndicatorAnimating: false,
    }
  }

  componentWillMount() {
    const { navigation } = this.props

    const user = navigation.getParam('userName')
    const product = navigation.getParam('productName')
    const price = navigation.getParam('productPrice')

    this.setState({ user, product, price })
  }

  handleConfirm = async () => {
    this.setState({ isActivityIndicatorAnimating: true })

    try {
      await createTransaction({
        created_at: currentDate(),
        user: this.state.user,
        product: this.state.product,
        price: this.state.price,
      })

      Alert.alert(`Compra efetuada.\nObrigado, ${this.state.user}! 🥳`)
    } catch (error) {
      Alert.alert(`Ocorreu um erro ao confirmar a compra. 🤕`)
    } finally {
      this.setState({ isActivityIndicatorAnimating: false })

      this.props.navigation.popToTop()
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text>{ this.state.user }</Text>
          <Text>{ this.state.product }</Text>
          <Text>{ parsePrice(this.state.price) }</Text>
        </ScrollView>
        <View style={styles.whiteOverlay}>
          <ActivityIndicator
            animating={this.state.isActivityIndicatorAnimating}
            size='large'
          />
        </View>
        <View>
          <Button
            type="outline"
            title="Cancelar"
            onPress={ () => this.props.navigation.popToTop() }
          />

          <Button
            title="Confirmar"
            onPress={this.handleConfirm}
          />
        </View>
      </View>
    )
  }
}
