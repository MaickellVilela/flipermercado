import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator, Alert } from 'react-native'
import { Button, ListItem } from 'react-native-elements'

import { createTransaction } from '../../helpers/actions'
import { currentDate } from '../../helpers/time'
import { parsePrice } from '../../helpers/currency'
import styles from './styles'

export default class Confirmation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isActivityIndicatorAnimating: false,
    }
  }

  componentWillMount() {
    const { navigation } = this.props

    const user = navigation.getParam('userName')
    const product = navigation.getParam('productName')
    const price = navigation.getParam('productPrice')

    this.setState({
      user,
      data: [
        { product, price },
      ],
    })
  }

  handleConfirm = async () => {
    this.setState({ isActivityIndicatorAnimating: true })

    try {
      await createTransaction({
        created_at: currentDate(),
        user: this.state.user,
        product: this.state.data[0].product,
        price: this.state.data[0].price,
      })

      Alert.alert(`Compra efetuada.\nObrigado, ${this.state.user}! 🥳`)
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
      title={ item.product }
      subtitle={ parsePrice(item.price) }
    />
  )

  render() {
    const { data } = this.state

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
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
