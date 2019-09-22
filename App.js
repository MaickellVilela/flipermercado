import React, { Component } from 'react'
import AppNavigator from './AppNavigator'

import { ThemeProvider } from 'react-native-elements';

import theme from './themes/default'

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    )
  }
}
