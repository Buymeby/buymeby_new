import React from 'react'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'

import VendorLocatorCallout from './VendorLocatorCallout'
import LoadingSpinner from './LoadingSpinner'
import VendorActions from '../Redux/VendorRedux'

import Styles from './Styles/VendorLocatorStyles'
import { calculateRegion } from '../Lib/MapHelpers'

class VendorLocator extends React.Component {
  constructor (props) {
    super(props)

    this.state = { region: props.quantity }
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      region: newProps.region
    })
  }

  onRegionChange = (region) => {
      this.setState({ region: region });
  }

  // onRegionChange (newRegion) {
  //   const searchRegion = {
  //     ne_lat: newRegion.latitude + newRegion.latitudeDelta / 2,
  //     ne_long: newRegion.longitude + newRegion.longitudeDelta / 2,
  //     sw_lat: newRegion.latitude - newRegion.latitudeDelta / 2,
  //     sw_long: newRegion.longitude - newRegion.longitudeDelta / 2
  //   }
  //   Fetch new data...
  // }

  renderMapMarkers (vendor) {
    return (
      <MapView.Marker key={vendor.name} coordinate={{latitude: Number(vendor.latitude), longitude: Number(vendor.longitude)}} onPress={this.props.calloutVendor.bind(this, vendor)} />
    )
  }

  render () {
    const vendors = this.props.vendors;
    const fetching = this.props.fetching;

    if (fetching) {
      return (
        <LoadingSpinner />
      )
    } else {
      return (
        <MapView
          style={Styles.container}
          region={this.state.region || this.props.region}
          onRegionChangeComplete={this.onRegionChange}
          showsUserLocation={true}
          provider="google"
        >
          {vendors.map((vendor) => this.renderMapMarkers(vendor))}
        </MapView>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    vendors: state.vendor.vendors,
    locations: state.vendor.locations,
    region: state.vendor.region,
    fetching: state.vendor.fetching,
    error: state.vendor.error
  }
}

const mapDispatchToProps = (dispatch) => ({
  calloutVendor: (vendor) => dispatch(VendorActions.calloutVendor(vendor))
})

export default connect(mapStateToProps, mapDispatchToProps)(VendorLocator)
