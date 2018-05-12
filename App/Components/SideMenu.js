import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import styles from '../Navigation/Styles/NavigationStyles'

class SideMenu extends Component {
  render () {
    return (
      <View style={styles.sideMenuContainer}>
        <ScrollView>
          <TouchableOpacity onPress={this.props.navigateToScreen.bind(this, 'DiscoveryTab')}>
            <View style={styles.sideMenuItem}>
              <Icon name="globe" size={16} style={styles.menuIcon}/>
              <Text style={styles.menuText}>Discover</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.navigateToScreen.bind(this, 'OrdersScreen')}>
            <View  style={styles.sideMenuItem}>
              <Icon name="history" size={16} style={styles.menuIcon}/>
              <Text style={styles.menuText}>Order History</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.navigateToScreen.bind(this, 'ProfileScreen')}>
            <View  style={styles.sideMenuItem}>
              <Icon name="user-circle-o" size={16} style={styles.menuIcon}/>
              <Text style={styles.menuText}>Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.navigateToScreen.bind(this, 'RegistrationScreen')}>
            <View style={styles.sideMenuItem}>
              <Icon name="question-circle-o" size={16} style={styles.menuIcon}/>
              <Text style={styles.menuText}>Help and Support</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigateToScreen: (route) => {
    dispatch(NavigationActions.navigate({ routeName: route }))
  }
})

export default connect(null, mapDispatchToProps)(SideMenu)
