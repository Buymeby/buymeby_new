import React from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {
  TouchableOpacity,
  Image,
  Subtitle,
  View,
  Caption,
  Row,
  Button
} from '@shoutem/ui';

import VendorActions from '../Redux/VendorRedux'
import Chevron from '../Components/Chevron'

class VendorListItem extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { vendor } = this.props
    const { key } = this.props

    return (
      <TouchableOpacity key={key} onPress={this.props.openVendorDetails.bind(this, vendor)}>
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
          <Button styleName="right-icon">
            <Chevron />
          </Button>
        </Row>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  openVendorDetails: (vendor) => {
    dispatch(VendorActions.vendorRequest(vendor))
    dispatch(NavigationActions.navigate({ routeName: 'VendorTab' }))
  }
})

export default connect(null, mapDispatchToProps)(VendorListItem)
