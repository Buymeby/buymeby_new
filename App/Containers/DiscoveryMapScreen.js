import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import VendorActions from '../Redux/VendorRedux'
import VendorLocator from '../Components/VendorLocator'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/ScreenStyles'

class DiscoveryMapScreen extends Component {
  componentDidMount() {
    this.props.getVendorList()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <VendorLocator />
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getVendorList: () => dispatch(VendorActions.vendorListRequest())
})

export default connect(null, mapDispatchToProps)(DiscoveryMapScreen)
