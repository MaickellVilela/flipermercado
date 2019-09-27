import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ActivityIndicator, Alert, FlatList, View,
} from 'react-native'
import { Button, ListItem } from 'react-native-elements'

import { createTransaction } from '../../helpers/actions'
import { parsePrice } from '../../helpers/currency'
import { currentDate } from '../../helpers/time'
import styles from './styles'

export default class Confirmation extends Component {
  static navigationOptions({ navigation }) {
    return { title: navigation.state.params.userName }
  }

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isActivityIndicatorAnimating: false,
    }

    this.handleConfirm = this.handleConfirm.bind(this)
  }

  componentWillMount() {
    const { navigation } = this.props

    const user = navigation.getParam('userName')
    const product = navigation.getParam('productName')
    const price = navigation.getParam('productPrice')

    this.setState({
      user,
      data: [{ product, price }],
    })
  }

  async handleConfirm() {
    const { navigation } = this.props
    const { user, data } = this.state

    this.setState({ isActivityIndicatorAnimating: true })

    try {
      await createTransaction({
        created_at: currentDate(),
        product: data[0].product,
        price: data[0].price,
        user,
      })

      Alert.alert(`Compra efetuada.\nObrigado, ${user}! 🥳`)
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
    return <ListItem title={item.product} subtitle={parsePrice(item.price)} />
  }

  render() {
    const { navigation } = this.props
    const { data, isActivityIndicatorAnimating } = this.state

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
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
            title="Confirmar"
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
