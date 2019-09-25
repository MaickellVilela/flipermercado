import React, { PureComponent } from 'react'
import { View, Image } from 'react-native'

import styles from './styles'

import logo from '../../assets/logo.png'

export default class Splash extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} />
      </View>
    )
  }
}
