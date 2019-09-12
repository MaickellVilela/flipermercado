import React, { Component } from 'react'
import { FlatList } from 'react-native'

import { Header, ListItem } from 'react-native-elements'
import axios from 'axios'

import config from './config'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { persons: [], products: [] }
  }
  componentDidMount() {
    axios.post(config.googleScriptURL + '?action=list_users')
      .then(res => {
        const persons = res.data
        this.setState({ persons })
      })

    axios.post(config.googleScriptURL + '?action=list_products')
      .then(res => {
        const products = res.data
        this.setState({ products })
      })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      button
      title={item[0]}
      onPress={() => {
        this.props.navigation.navigate('ProductList', {
          userName: item[0],
          products: this.state.products,
        })
      }}
    />
  )

  render() {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.persons}
        renderItem={this.renderItem}
      />
    )
  }
}
