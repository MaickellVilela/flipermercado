import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Header } from 'react-native-elements'

import Home from './Home'
import ProductList from './ProductList'
import Confirmation from './components/confirmation'

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    ProductList: ProductList,
    Confirmation: Confirmation,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
