import React from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import timeToHumanReadable from '../Lib/OperationalHoursHelper'
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

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  status = {
    open_soon: {
      color: 'green',
      display_text: 'Opening Soon'
    },
    close_soon: {
      color: 'orange',
      display_text: 'Closing Soon'
    },
    open: {
      color: 'green',
      display_text: 'Open'
    },
    closed: {
      color: 'red',
      display_text: 'Closed'
    }
  }

  getDayHours(hours) {
    const current_date = new Date()
    const day_index = current_date.getDay()
    return hours.find(day_hours => day_hours.day === this.days[day_index])
  }

  getVendorStatus(hours) {
    const current_date = new Date()
    const current_hour = current_date.getHours()
    const current_minutes = current_date.getMinutes()
    let day_hours = this.getDayHours(hours)
    if (day_hours) {
      const open_hour = new Date(day_hours.open_time).getHours()
      const open_minutes = new Date(day_hours.open_time).getMinutes()
      const close_hour = new Date(day_hours.close_time).getHours()
      const close_minutes = new Date(day_hours.close_time).getMinutes()
      if ((!(current_hour === close_hour && current_minutes < close_minutes)) &&
         ((current_hour === open_hour && current_minutes < open_minutes) ||
         (current_hour === open_hour-1 && current_minutes >= open_minutes) ||
         (open_hour === 0 && current_hour === 23 && current_minutes >= open_minutes)))
      {
        return 'open_soon'
      } else if ((!(current_hour === open_hour && current_minutes < open_minutes)) &&
                ((current_hour === close_hour && current_minutes < close_minutes) ||
                (current_hour === close_hour-1 && current_minutes >= close_minutes) ||
                (close_hour === 0 && current_hour === 23 && current_minutes >= close_minutes)))

      {
        return 'close_soon'
      } else if ((open_hour > close_hour && (current_hour < close_hour || current_hour > open_hour)) ||
                (open_hour > close_hour && current_hour === open_hour && current_minutes >= open_minutes && current_hour > close_hour) ||
                (close_hour > open_hour && current_hour === open_hour && current_minutes >= open_minutes && current_hour < close_hour) ||
                (close_hour > open_hour && current_hour > open_hour && current_hour < close_hour))
      {
        return 'open'
      } else {
        return 'closed'
      }
    } else {
      return 'closed'
    }
  }

  displayCurrentHours(hours) {
    if (hours) {
      let day_hours = this.getDayHours(hours)
      if (day_hours && day_hours.open_time && day_hours.close_time) {
        return (
          <Caption>
            {': ' + timeToHumanReadable(day_hours.open_time) + ' - ' + timeToHumanReadable(day_hours.close_time)}
          </Caption>
        )
      }
    }
  }

  printStatus(hours) {
    if (hours) {
      vendor_status = this.status[this.getVendorStatus(hours)]
      return <Caption style={{color: vendor_status.color}}>{vendor_status.display_text}</Caption>
    } else {
      return <Caption style={{color: 'red'}}>Closed</Caption>
    }
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
              {this.printStatus(vendor.hours)}
              {this.displayCurrentHours(vendor.hours)}
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
