import React, { Component } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  View,
} from 'react-native'

import { Button, List, ListItem, Overlay } from 'react-native-elements'

import { UserBar } from '../../components'

import { createTransaction } from '../../helpers/actions'
import { currentDate } from '../../helpers/time'
import { parsePrice } from '../../helpers/currency'
import styles from './styles'

export default class Confirmation extends Component {
  constructor(props) {
    super(props)

    const { navigation } = this.props

    this.state = {
      user: navigation.getParam('user'),
      cart: navigation.getParam('cart'),
      isActivityIndicatorAnimating: false,
    }
  }

  handleConfirm = async () => {
    const { user, cart } = this.state

    this.setState({ isActivityIndicatorAnimating: true })

    try {
      await createTransaction({
        created_at: currentDate(),
        user: user.name,
        product: cart[0].name,
        price: cart[0].price,
      })

      Alert.alert(`Compra efetuada.\nObrigado, ${user.name}! 🥳`)
    } catch (error) {
      Alert.alert(`Ocorreu um erro ao confirmar a compra. 🤕`)
    } finally {
      this.setState({ isActivityIndicatorAnimating: false })

      this.props.navigation.popToTop()
    }
  }

  cartTotalPrice = () => this.state.cart.reduce((memo, product) => memo + product.price, 0)

  keyExtractor = (_, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      rightTitle={ parsePrice(item.price) }
    />
  )

  render() {
    const { user, cart } = this.state

    return (
      <View style={{ flex: 1 }}>
        { this.state.isActivityIndicatorAnimating &&
          ( <View style={styles.whiteOverlay}>
              <ActivityIndicator animating size='large' />
            </View>
          )
        }

        <UserBar user={user} />

        <FlatList
          data={cart}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />

        <ListItem
          titleStyle={styles.total}
          title='Total'
          rightTitle={ parsePrice(this.cartTotalPrice()) }
        />

        <View>
          <Button
            title="Confirmar"
            onPress={this.handleConfirm}
            disabled={this.state.isActivityIndicatorAnimating}
          />

          <Button
            type="outline"
            title="Cancelar"
            onPress={ () => this.props.navigation.popToTop() }
            disabled={this.state.isActivityIndicatorAnimating}
          />
        </View>
      </View>
    )
  }
}
