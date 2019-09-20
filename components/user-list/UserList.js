import React, { Component } from 'react'
import { SectionList, Text, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'

import { fetchUsers, fetchProducts } from '../../helpers/actions'
import { createSectionData } from '../../helpers/alphabetic-grouping'
import styles from './styles'

export default class UserList extends Component {
  constructor(props) {
    super(props)

    this.state = { users: [], products: [] }
  }

  async componentWillMount() {
    const users = await fetchUsers()

    const { products } = await fetchProducts()

    this.setState({ users, products })
  }

  keyExtractor = (_, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      button
      title={item.name}
      leftAvatar={{ source: { uri: item.avatar } }}
      onPress={() => {
        this.props.navigation.navigate('ProductList', {
          userName: item.name,
          products: this.state.products,
        })
      }}
    />
  )

  sectionData = () => {
    const { users } = this.state

    const sections = createSectionData(users)

    return sections.filter(section => section.data.length !== 0)
  }

  render() {
    return (
      this.state.users &&
      <SectionList
        sections={this.sectionData()}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{ title }</Text>
        )}
      />
    )
  }
}
