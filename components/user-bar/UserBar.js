import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Badge, ListItem } from 'react-native-elements'

import { parsePrice } from '../../helpers/currency'

export default class UserBar extends PureComponent {
  render() {
    const { user } = this.props

    return (
      <ListItem
        leftAvatar={{
          title: user.name,
          source: { uri: user.avatar },
        }}
        rightElement={() => (
          <Badge value={parsePrice(user.balance * -1)} status="primary" />
        )}
        title={user.name}
        bottomDivider
      />
    )
  }
}

UserBar.propTypes = {
  user: PropTypes.object.isRequired,
}
