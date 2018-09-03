import React from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {
  timeToHumanReadable,
  getCurrentHours,
  getStatusColor,
  getStatusText
} from '../Lib/OperationalHoursHelper'
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

const shorten_description = (description) => {
  if (description && description.length > 90) {
    return description.substr(0, 90) + '...'
  } else {
    return description
  }
}

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
              <Caption style={{color: getStatusColor(vendor.hours)}}>{getStatusText(vendor.hours)}</Caption>
              <Caption>{getCurrentHours(vendor.hours)}</Caption>
            </View>
            <View styleName="horizontal">
              <Caption>{shorten_description(vendor.description)}</Caption>
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
