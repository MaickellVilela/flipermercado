import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, Alert } from 'react-native'
import { Button, ListItem } from 'react-native-elements'

import { createTransaction } from '../../helpers/actions'
import { currentDate } from '../../helpers/time'
import styles from './styles'

export default class Confirmation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isActivityIndicatorAnimating: false,
    }
  }

  componentDidMount() {
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

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={item.product}
      subtitle={item.price.toString()}
    />
  );

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
