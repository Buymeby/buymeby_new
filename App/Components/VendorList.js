import React from 'react'
import { connect } from 'react-redux'
import {
  Divider,
  TouchableOpacity,
  Image,
  Subtitle,
  View,
  Caption,
  Row,
  Button,
  Icon,
  Title
} from '@shoutem/ui';

import LoadingSpinner from './LoadingSpinner'
import VendorListItem from './VendorListItem'


class VendorList extends React.Component {

  render () {
    const vendors = this.props.vendors;
    const fetching = this.props.fetching;

    if (fetching) {
      return (
        <LoadingSpinner />
      )
    } else {
      return (
        vendors.map((vendor, i) => (
          <VendorListItem vendor={vendor} key={i}/>
        ))
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    vendors: state.vendor.vendors,
    fetching: state.vendor.fetching,
    error: state.vendor.error
  }
}

const mapDispatchToProps = (dispatch) => ({
  openVendorDetails: (vendor) => dispatch({ type: 'NavigateVendor', vendor: vendor })
})

export default connect(mapStateToProps, mapDispatchToProps)(VendorList)
