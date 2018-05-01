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
  Icon
} from '@shoutem/ui';


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
            <Icon name="right-arrow"/>
          </Button>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  openVendorDetails: (vendor) => dispatch({ type: 'NavigateVendor', vendor: vendor })
})

export default connect(null, mapDispatchToProps)(VendorListItem)
