import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation'

import { Platform, Image, StyleSheet } from 'react-native'

import Home from './Home'
import { Confirmation, ProductList } from './components'
import logo from './assets/logo.png'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        headerLeft: header,
        title: 'Flipermercado'
      }),
    },
    ProductList: {
      screen: ProductList,
      navigationOptions: () => ({
        title: 'Produtos',
        headerRight: header
      }),
    },
    Confirmation: {
      screen: Confirmation,
      navigationOptions: ({ navigation })  => ({
        headerRight: header,
        title: navigation.state.params.userName,
      }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
      },
    }
  }
)

const header = <Image style = {styles.stretch} source = { logo } />

const styles = StyleSheet.create({
  stretch: {
    width: 50,
    height: 50,
    margin: 20,
    resizeMode: 'stretch',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  }
});

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
