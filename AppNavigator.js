import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation'

import Home from './Home'
import { Confirmation, ProductList } from './components'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: 'Flipermercado'
      }),
    },
    ProductList: {
      screen: ProductList,
      navigationOptions: () => ({
        title: 'Produtos',
      }),
    },
    Confirmation: {
      screen: Confirmation,
      navigationOptions: ({ navigation })  => ({
        title: navigation.state.params.userName,
      }),
    },
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
