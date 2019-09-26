import React, { PureComponent } from 'react'
import { Image, View } from 'react-native'

import logo from '../../assets/logo.png'
import styles from './styles'

export default class Splash extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} />
      </View>
    )
  }
}
