import React, { PureComponent } from 'react'
import { ThemeProvider } from 'react-native-elements'

import AppNavigator from './AppNavigator'
import { theme } from './themes/default'

export default class App extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    )
  }
}
