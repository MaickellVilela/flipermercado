import {
  View, FlatList, ActivityIndicator, Alert,
} from 'react-native'
import React, { Component } from 'react'
import { Button, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'

import { createTransaction } from '../../helpers/actions'
import { currentDate } from '../../helpers/time'
import { parsePrice } from '../../helpers/currency'
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
    const { props, state } = this

    this.setState({ isActivityIndicatorAnimating: true })

    try {
      await createTransaction({
        created_at: currentDate(),
        user: state.user,
        product: state.data[0].product,
        price: state.data[0].price,
      })

      Alert.alert(`Compra efetuada.\nObrigado, ${state.user}! 🥳`)
    } catch (error) {
      Alert.alert('Ocorreu um erro ao confirmar a compra. 🤕')
    } finally {
      this.setState({ isActivityIndicatorAnimating: false })

      props.navigation.popToTop()
    }
  }

  keyExtractor(_, index) {
    return index.toString()
  }

  renderItem({ item }) {
    return <ListItem title={item.product} subtitle={parsePrice(item.price)} />
  }

  render() {
    const { props, state } = this
    const { data } = state

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />

        <View style={styles.whiteOverlay}>
          {state.isActivityIndicatorAnimating && (
            <ActivityIndicator animating size="large" />
          )}
        </View>

        <View>
          <Button
            title="Confirmar"
            onPress={this.handleConfirm}
            disabled={state.isActivityIndicatorAnimating}
          />

          <Button
            type="outline"
            title="Cancelar"
            onPress={() => props.navigation.popToTop()}
            disabled={state.isActivityIndicatorAnimating}
          />
        </View>
      </View>
    )
  }
}

Confirmation.propTypes = {
  navigation: PropTypes.object.isRequired,
}
