import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator, Alert } from 'react-native'
import { Button, ListItem } from 'react-native-elements'

import { UserBar } from '../../components'

import { createTransaction } from '../../helpers/actions'
import { currentDate } from '../../helpers/time'
import { parsePrice } from '../../helpers/currency'
import styles from './styles'

export default class Confirmation extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Carrinho'
  })

  constructor(props) {
    super(props)

    const { navigation } = this.props

    this.state = {
      user: navigation.getParam('user'),
      product: navigation.getParam('product'),
      isActivityIndicatorAnimating: false,
    }
  }

  handleConfirm = async () => {
    const { user, product } = this.state

    this.setState({ isActivityIndicatorAnimating: true })

    try {
      await createTransaction({
        created_at: currentDate(),
        user: user.name,
        product: product.name,
        price: product.price,
      })

      Alert.alert(`Compra efetuada.\nObrigado, ${user.name}! 🥳`)
    } catch (error) {
      Alert.alert(`Ocorreu um erro ao confirmar a compra. 🤕`)
    } finally {
      this.setState({ isActivityIndicatorAnimating: false })

      this.props.navigation.popToTop()
    }
  }

  keyExtractor = (_, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={ item.name }
      subtitle={ parsePrice(item.price) }
    />
  )

  render() {
    const { user, product } = this.state

    return (
      <View style={{ flex: 1 }}>
        <UserBar user={user} />

        <FlatList
          data={[product]}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />

        <View style={styles.whiteOverlay}>
          { this.state.isActivityIndicatorAnimating &&
            ( <ActivityIndicator animating size='large' /> )
          }
        </View>

        <View>
          <Button
            title="Comprar"
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
