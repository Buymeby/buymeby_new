import React from 'react'

import { Text, Animated, Easing, TouchableOpacity, Image, View } from 'react-native'
import { StackNavigator, DrawerNavigator, TabNavigator, TabBarTop } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

import SideMenu from '../Components/SideMenu'
import SplashScreen from '../Containers/SplashScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import LoginScreen from '../Containers/LoginScreen'
import DiscoveryMapScreen from '../Containers/DiscoveryMapScreen'
import DiscoveryListScreen from '../Containers/DiscoveryListScreen'
import ItemDetailsScreen from '../Containers/ItemDetailsScreen'
import CartScreen from '../Containers/CartScreen'
import VendorDetailsScreen from '../Containers/VendorDetailsScreen'
import VendorStoreScreen from '../Containers/VendorStoreScreen'
import OrdersScreen from '../Containers/OrdersScreen'
import OrderDetailsScreen from '../Containers/OrderDetailsScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes/'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

const VendorTab = TabNavigator({
  VendorDetailsScreen: {
    screen: VendorDetailsScreen,
    navigationOptions: {
      title: 'Profile'
    }
  },
  VendorStoreScreen: {
    screen: VendorStoreScreen,
    navigationOptions: {
      title: 'Shop'
    }
  }
}, {
  initialRouteName: 'VendorDetailsScreen',
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  lazy: false,
  animationEnabled:false,
  tabBarOptions: {
    style: styles.tabHeader,
    labelStyle: styles.tabLabel
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
    style: styles.tabHeader,
    labelStyle: styles.tabLabel
  }
})

const PrimaryNav = StackNavigator({
  DiscoveryTab: {
    screen: DiscoveryTab,
    navigationOptions: ({navigation}) => ({
      headerTitle: <Image source={require('../Images/logo.png')} style={styles.logo} />,
      headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                    <Icon name="bars" size={25} style={styles.headerIconLeft} />
                  </TouchableOpacity>
    })
  },
  VendorTab: {
    screen: VendorTab
  },
  ItemDetailsScreen: {
    screen: ItemDetailsScreen
  },
  CartScreen: {
    screen: CartScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: "Cart",
      headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DiscoveryTab') }}>
                     <Icon name="home" size={25} style={styles.headerIconRight} />
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
                   <Icon name="shopping-cart" size={25} style={styles.headerIconRight} />
                 </TouchableOpacity>,
    headerStyle: styles.header,
    headerBackTitle: null,
    headerTintColor: Colors.secondary
  })
})

const OrdersStack = StackNavigator({
  OrdersScreen: {
    screen: OrdersScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: "Orders",
      headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                    <Icon name="bars" size={25} style={styles.headerIconLeft} />
                  </TouchableOpacity>,
      headerRight: <TouchableOpacity onPress={() => { navigation.navigate('CartScreen') }}>
                    <Icon name="shopping-cart" size={25} style={styles.headerIconRight} />
                  </TouchableOpacity>
    })
  },
  OrderDetailsScreen: {
    screen: OrderDetailsScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: "Order"
    })
  }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    gesturesEnabled: false,
    headerStyle: styles.header,
    headerBackTitle: null,
    headerTintColor: Colors.secondary
  })
})

const ProfileStack = StackNavigator({
  ProfileScreen: { screen: ProfileScreen }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerTitle: "Profile",
    headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                   <Icon name="bars" size={20} style={styles.headerIconLeft} />
                 </TouchableOpacity>,
    headerStyle: styles.header,
    headerBackTitle: null,
    headerTintColor: Colors.secondary
  })
})

const DrawerNav = DrawerNavigator({
  PrimaryNav: { screen: PrimaryNav, navigationOptions: {title: <View><Icon name="globe" size={16} style={styles.menuIcon}/><Text style={styles.menuText}>Discover</Text></View>}},
  Profile: { screen: ProfileStack, navigationOptions: {title: 'Profile'} },
  Orders: { screen: OrdersStack, navigationOptions: {title: 'Orders'} },
  Register: { screen: RegistrationScreen, navigationOptions: {title: 'Logout'} },
}, {
  gesturesEnabled: false,
  contentComponent: SideMenu
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
