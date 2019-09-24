import React from 'react'

import { createStackNavigator, createAppContainer } from 'react-navigation'

import Home from './Home'
import { ProductList, Confirmation } from './components'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      params: {
        isLoading: true,
      },
    },
    ProductList: { screen: ProductList },
    Confirmation: { screen: Confirmation },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
      },
    }
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
