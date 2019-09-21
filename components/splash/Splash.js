import React, { Component } from 'react'
import { View, Image } from 'react-native'

import styles from './styles'

import logo from '../../assets/logo.png'

export default class Splash extends Component {
  render = () => (
    <View style={styles.container}>
      <Image source={logo} />
    </View>
  )
}
