import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import getDirections from 'react-native-google-maps-directions'
import {
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'
import {
  Heading,
  Tile,
  Text,
  Title,
  Subtitle,
  Caption,
  Icon,
  Row,
  Divider,
  View
} from '@shoutem/ui'

import LoadingSpinner from '../Components/LoadingSpinner'
import timeToHumanReadable from '../Lib/OperationalHoursHelper'
import Chevron from '../Components/Chevron'

class VendorDetailsScreen extends Component {
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

  render () {
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
          <KeyboardAvoidingView behavior='position'>
            <Tile>
              <View styleName='center md-gutter-top'>
                <Image style={styles.avatar} source={image_source} />
              </View>
            </Tile>
            <Row>
              <Text>{this.props.description}</Text>
            </Row>
            <Divider styleName='line' />
            <TouchableOpacity onPress={this.handleGetDirections}>
              <Row>
                <View>
                  <Subtitle styleName="sm-gutter-bottom">Address</Subtitle>
                  <Text>{this.props.address}</Text>
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
                          <Text key={day}>
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
                            <Text key={day + i}>
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
          </KeyboardAvoidingView>
        </ScrollView>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, null)(VendorDetailsScreen)

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
})

const HeaderTitle = ({ navigation, text }) => <Subtitle navigation={navigation}>{text}</Subtitle>;
const ConnectedHeaderTitle = connect(state => ({ text: state.vendor.selected_vendor.name }))(HeaderTitle);
