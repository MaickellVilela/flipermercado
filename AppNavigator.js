import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Platform, Image, StyleSheet } from 'react-native'

import logo from './assets/logo.png'
import Home from './Home'
import { UserList, ProductList, Confirmation } from './components'

const styles = StyleSheet.create({
  stretch: {
    width: 45,
    height: 50,
    margin: 20,
    resizeMode: 'stretch',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
})

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      params: {
        isLoading: true,
      },
    },
    UserList: { screen: UserList },
    ProductList: { screen: ProductList },
    Confirmation: { screen: Confirmation },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerLeft: () => <Image style={styles.stretch} source={logo} />,
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
      },
    },
  },
)

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
