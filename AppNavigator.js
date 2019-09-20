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
        headerLeft: <Image style={styles.stretch} source={logo} />,
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

const styles = StyleSheet.create({
  stretch: {
    width: 45,
    height: 50,
    margin: 20,
    resizeMode: 'stretch',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  }
});

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
