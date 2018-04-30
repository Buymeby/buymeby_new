import React from 'react'

import { Text, Animated, Easing, TouchableOpacity } from 'react-native'
import { StackNavigator, DrawerNavigator, TabNavigator, TabBarTop } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

import SplashScreen from '../Containers/SplashScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import LoginScreen from '../Containers/LoginScreen'
import DiscoveryMapScreen from '../Containers/DiscoveryMapScreen'
import DiscoveryListScreen from '../Containers/DiscoveryListScreen'
import styles from './Styles/NavigationStyles'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

const DiscoveryTab = TabNavigator({
  DiscoveryMapScreen: {
    screen: DiscoveryMapScreen,
    navigationOptions: {
      title: 'Map'
    }
  },
  DiscoveryListScreen: {
    screen: DiscoveryListScreen,
    navigationOptions: {
      title: 'List'
    }
  }
}, {
  initialRouteName: 'DiscoveryMapScreen',
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  lazy: false,
  animationEnabled:false,
  tabBarOptions: {
    style:{
      backgroundColor: '#d3d3d3',
    }
  }
})

const PrimaryNav = StackNavigator({
  DiscoveryTab: {
    screen: DiscoveryTab,
    navigationOptions: ({navigation}) => ({
      headerTitle: "Buymeby",
      headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                    <Icon name="bars" size={20} style={{paddingLeft: 10}} />
                  </TouchableOpacity>
    })
  }
}, {
  headerMode: 'float',
  initialRouteName: 'DiscoveryTab',
  lazy: true,
  swipeEnabled:false,
  animationEnabled:false,
  navigationOptions: ({navigation}) => ({
    gesturesEnabled: false,
    headerRight: <TouchableOpacity onPress={() => { navigation.navigate('CartScreen') }}>
                   <Icon name="shopping-cart" size={20} style={{paddingRight: 10}} />
                 </TouchableOpacity>
  })
})

const DrawerNav = DrawerNavigator({
  PrimaryNav: { screen: PrimaryNav, navigationOptions: {title: 'Discover'}},
  // Profile: { screen: ProfileStack, navigationOptions: {title: 'Profile'} },
  // Orders: { screen: OrdersStack, navigationOptions: {title: 'Orders'} },
  Register: { screen: RegistrationScreen, navigationOptions: {title: 'Logout'} },
}, {
  gesturesEnabled: false
})

const RootNav = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  RegistrationScreen: { screen: RegistrationScreen },
  LoginScreen: { screen: LoginScreen },
  DrawerNav: { screen: DrawerNav }
}, {
  // Default config for all screens
  headerMode: 'none',
  transitionConfig: noTransitionConfig
})

export default RootNav
