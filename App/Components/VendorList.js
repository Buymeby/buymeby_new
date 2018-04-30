import React from 'react'
import { connect } from 'react-redux'
import {
  Screen,
  Divider,
  ScrollView,
  GridRow,
  TouchableOpacity,
  Image,
  Subtitle,
  Card,
  View,
  Caption,
  Row,
  Button,
  Icon,
  Title
} from '@shoutem/ui';

import LoadingSpinner from './LoadingSpinner'


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
          <TouchableOpacity key={i} onPress={this.props.openVendorDetails.bind(this, vendor)}>
            <Row>
              <Image
                styleName="small rounded-corners"
                source={{ uri: vendor.image_src || vendor.logo_url }}
              />
              <View styleName="vertical stretch space-between">
                <Subtitle>{vendor.name}</Subtitle>
                <View styleName="horizontal">
                  <Caption>{vendor.description}</Caption>
                </View>
              </View>
              <Button styleName="right-icon" onPress={this.props.openVendorDetails.bind(this, vendor)}>
                <Icon name="right-arrow"/>
              </Button>
            </Row>
            <Divider styleName="line" />
          </TouchableOpacity>
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
