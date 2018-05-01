import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import VendorActions from '../Redux/VendorRedux'
import VendorLocator from '../Components/VendorLocator'
import VendorListItem from '../Components/VendorListItem'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/ScreenStyles'

class DiscoveryMapScreen extends Component {
  componentDidMount() {
    this.props.getVendorList()
  }

  render () {
    const calloutVendor = this.props.calloutVendor

    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <VendorLocator />
        </View>
        {
          calloutVendor && <VendorListItem vendor={calloutVendor} />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    calloutVendor: state.vendor.calloutVendor
  }
}

const mapDispatchToProps = (dispatch) => ({
  getVendorList: () => dispatch(VendorActions.vendorListRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryMapScreen)
