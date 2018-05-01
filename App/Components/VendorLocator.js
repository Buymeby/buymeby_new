import React from 'react'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'

import VendorLocatorCallout from './VendorLocatorCallout'
import LoadingSpinner from './LoadingSpinner'

import Styles from './Styles/VendorLocatorStyles'
import { calculateRegion } from '../Lib/MapHelpers'


/* ***********************************************************
* IMPORTANT!!! Before you get started, if you are going to support Android,
* PLEASE generate your own API key and add it to android/app/src/main/AndroidManifest.xml
* https://console.developers.google.com/apis/credentials
* Also, you'll need to enable Google Maps Android API for your project:
* https://console.developers.google.com/apis/api/maps_android_backend/
*************************************************************/

class VendorLocator extends React.Component {
  /* ***********************************************************
  * This generated code is only intended to get you started with the basics.
  * There are TONS of options available from traffic to buildings to indoors to compass and more!
  * For full documentation, see https://github.com/lelandrichardson/react-native-maps
  *************************************************************/

  // constructor (props) {
    // this.renderMapMarkers = this.renderMapMarkers.bind(this)
    // this.onRegionChange = this.onRegionChange.bind(this)
  // }

  componentWillReceiveProps (newProps) {
    /* ***********************************************************
    * STEP 3
    * If you wish to recenter the map on new locations any time the
    * props change, do something like this:
    *************************************************************/
    // this.setState({
    //   region: calculateRegion(newProps.locations, { latPadding: 0.1, longPadding: 0.1 })
    // })
  }

  onRegionChange (newRegion) {
    /* ***********************************************************
    * STEP 4
    * If you wish to fetch new locations when the user changes the
    * currently visible region, do something like this:
    *************************************************************/
    // const searchRegion = {
    //   ne_lat: newRegion.latitude + newRegion.latitudeDelta / 2,
    //   ne_long: newRegion.longitude + newRegion.longitudeDelta / 2,
    //   sw_lat: newRegion.latitude - newRegion.latitudeDelta / 2,
    //   sw_long: newRegion.longitude - newRegion.longitudeDelta / 2
    // }
    // Fetch new data...
  }

  renderMapMarkers (vendor) {
    return (
      <MapView.Marker key={vendor.name} coordinate={{latitude: Number(vendor.latitude), longitude: Number(vendor.longitude)}}>
        <VendorLocatorCallout location={{latitude: Number(vendor.latitude), longitude: Number(vendor.longitude)}} vendor={{image_src: vendor.image_src, name: vendor.name, description: vendor.description}} onPress={this.props.openVendorDetails.bind(this, vendor)} />
      </MapView.Marker>
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
          region={this.props.region}
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
  openVendorDetails: (vendor) => dispatch({ type: 'NavigateVendor', vendor: vendor })
})

export default connect(mapStateToProps, mapDispatchToProps)(VendorLocator)
