import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ActivityIndicator, Alert, FlatList, View,
} from 'react-native'
import { Button, ListItem } from 'react-native-elements'

import { createTransaction } from '../../helpers/actions'
import { parsePrice } from '../../helpers/currency'
import { currentDate } from '../../helpers/time'
import UserBar from '../user-bar'
import styles from './styles'

export default class Confirmation extends Component {
  static navigationOptions() {
    return {
      title: 'Carrinho',
    }
  }

  constructor(props) {
    super(props)

    this.state = { isActivityIndicatorAnimating: false }

    this.handleConfirm = this.handleConfirm.bind(this)
  }

  componentWillMount() {
    const { navigation } = this.props

    const user = navigation.getParam('user')
    const product = navigation.getParam('product')

    this.setState({ user, product })
  }

  async handleConfirm() {
    const { navigation } = this.props
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
      Alert.alert('Ocorreu um erro ao confirmar a compra. 🤕')
    } finally {
      this.setState({ isActivityIndicatorAnimating: false })

      navigation.popToTop()
    }
  }

  keyExtractor(_, index) {
    return index.toString()
  }

  renderItem({ item }) {
    return <ListItem title={item.name} subtitle={parsePrice(item.price)} />
  }

  render() {
    const { navigation } = this.props
    const { user, product, isActivityIndicatorAnimating } = this.state

    return (
      <View style={{ flex: 1 }}>
        <UserBar user={user} />

        <FlatList
          data={[product]}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />

        <View style={styles.whiteOverlay}>
          {isActivityIndicatorAnimating && (
            <ActivityIndicator animating size="large" />
          )}
        </View>

        <View>
          <Button
            title="Comprar"
            onPress={this.handleConfirm}
            disabled={isActivityIndicatorAnimating}
          />

          <Button
            type="outline"
            title="Cancelar"
            onPress={() => navigation.popToTop()}
            disabled={isActivityIndicatorAnimating}
          />
        </View>
      </View>
    )
  }
}

Confirmation.propTypes = {
  navigation: PropTypes.object.isRequired,
}
