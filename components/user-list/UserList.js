import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { SectionList, Text } from 'react-native'
import { ListItem } from 'react-native-elements'

import { createSectionData } from '../../helpers/alphabetic-grouping'
import styles from './styles'

export default class UserList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: props.navigation.getParam('users'),
      products: props.navigation.getParam('products'),
    }

    this.renderItem = this.renderItem.bind(this)
  }

  keyExtractor(_, index) {
    return index.toString()
  }

  sectionData() {
    const { users } = this.state

    const sections = createSectionData(users)

    return sections.filter((section) => section.data.length !== 0)
  }

  renderItem({ item }) {
    const { navigation } = this.props
    const { products } = this.state

    return (
      <ListItem
        button
        title={item.name}
        leftAvatar={{ source: { uri: item.avatar } }}
        onPress={() => {
          navigation.navigate('ProductList', {
            user: item,
            products,
          })
        }}
      />
    )
  }

  render() {
    const { users } = this.state

    return (
      users && (
        <SectionList
          sections={this.sectionData()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      )
    )
  }
}

UserList.propTypes = {
  navigation: PropTypes.object.isRequired,
}
