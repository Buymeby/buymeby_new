import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import VendorActions from '../Redux/VendorRedux'
import getDirections from 'react-native-google-maps-directions'
import {
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Modal,
  Text
} from 'react-native'
import {
  Heading,
  Tile,
  Title,
  Subtitle,
  Caption,
  Icon,
  Row,
  Divider,
  View,
  Button
} from '@shoutem/ui'

import LoadingSpinner from '../Components/LoadingSpinner'
import timeToHumanReadable from '../Lib/OperationalHoursHelper'
import Chevron from '../Components/Chevron'

import styles from './Styles/ItemDetailsScreenStyles'

class VendorDetailsScreen extends Component {
  state = {
    modalVisible: false,
  }

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

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
          <Text>
            {': ' + timeToHumanReadable(day_hours.open_time) + ' - ' + timeToHumanReadable(day_hours.close_time)}
          </Text>
        )
      }
    }
  }

  printStatus(hours) {
    if (hours) {
      vendor_status = this.status[this.getVendorStatus(hours)]
      return <Text style={{color: vendor_status.color}}>{vendor_status.display_text}</Text>
    } else {
      return <Text style={{color: 'red'}}>Closed</Text>
    }
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: <ConnectedHeaderTitle navigation={navigation} />
    };
  };

  handleGetDirections = () => {
    const data = {
      destination: {
        latitude: Number(this.props.latitude),
        longitude: Number(this.props.longitude)
      },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }

    getDirections(data)
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render () {
    const { vendor } = this.props
    const fetching = this.props.fetching

    if (fetching) {
      return (
        <LoadingSpinner />
      )
    } else {
      let uri = this.props.image_src || this.props.logo_url;
      let image_source = uri ? {uri: uri} : require('../Images/logo_missing.png')
      return (
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{paddingTop: 50, marginTop: 50, paddingHorizontal: 10}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 30}}>Would you like to flag this content as objectionable, inappropriate, or offensive?</Text>
                <Text style={styles.cautionText}>If flagged, our team will follow up with a course of action within 24 hours.</Text>
                <Text style={styles.cautionText}>Flagging will also block this vendor and associated content from showing up on your feed.</Text>
                <TouchableOpacity style={styles.button} onPress={this.props.blockVendor.bind(this, this.props.vendor, this)}>
                  <Text style={styles.buttonText}>FLAG AND BLOCK</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setModalVisible(false) }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <KeyboardAvoidingView behavior='position'>
            <Tile>
              <View styleName='center md-gutter-top'>
                <Image style={styles.avatar} source={image_source} />
              </View>
            </Tile>
            <Row>
              <Subtitle style={{textAlign: 'center'}}>
                {this.printStatus(vendor.hours)}
                {this.displayCurrentHours(vendor.hours)}
              </Subtitle>
            </Row>
            <Row>
              <Subtitle>{this.props.description}</Subtitle>
            </Row>
            <Divider styleName='line' />
            <TouchableOpacity onPress={this.handleGetDirections}>
              <Row>
                <View>
                  <Subtitle styleName="sm-gutter-bottom">Address</Subtitle>
                  <Text style={styles.infoText}>{this.props.address}</Text>
                </View>
                <Chevron />
              </Row>
            </TouchableOpacity>
            <Divider styleName='line' />
            <Row>
              <View styleName="vertical">
                <Subtitle>Hours of operation</Subtitle>
                <Row>
                  <View styleName="vertical">
                    {
                      this.days.map((day) => {
                        return(
                          <Text style={styles.infoText} key={day}>
                            {day + ': '}
                          </Text>
                        )
                      })
                    }
                  </View>
                  <View styleName="vertical">
                   {
                      this.days.map((day, i) => {
                        let day_hours = this.props.hours.find(day_hours => day_hours.day === day)
                        if (day_hours) {
                          return (
                            <Text style={styles.infoText} key={day + i}>
                              {timeToHumanReadable(day_hours.open_time) + ' - ' + timeToHumanReadable(day_hours.close_time)}
                            </Text>
                          )
                        }
                      })
                    }
                  </View>
                </Row>
              </View>
            </Row>
            <Divider styleName="line" />
            <TouchableOpacity onPress={() => { this.setModalVisible(true) }}>
              <Row>
                <Subtitle>Block / Report</Subtitle>
                <Icon name="error" />
              </Row>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    vendor: state.vendor.selected_vendor,
    name: state.vendor.selected_vendor.name,
    logo_url: state.vendor.selected_vendor.logo_url,
    image_src: state.vendor.selected_vendor.image_src,
    description: state.vendor.selected_vendor.description,
    latitude: state.vendor.selected_vendor.latitude,
    longitude: state.vendor.selected_vendor.longitude,
    address: state.vendor.selected_vendor.address,
    hours: state.vendor.selected_vendor.hours,
    fetching: state.vendor.fetching
  }
}

const mapDispatchToProps = (dispatch) => ({
  blockVendor: (vendor, component) => {
    component.setModalVisible(false)
    dispatch(VendorActions.vendorBlock(vendor))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(VendorDetailsScreen)

const HeaderTitle = ({ navigation, text }) => <Subtitle navigation={navigation}>{text}</Subtitle>;
const ConnectedHeaderTitle = connect(state => ({ text: state.vendor.selected_vendor.name }))(HeaderTitle);
