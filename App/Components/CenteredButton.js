import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from '../Containers/Styles/ItemDetailsScreenStyles'

// Note that this file (App/Components/FullButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

export default class CenteredButton extends Component {
  render () {
    return (
      <View style={[styles.centered, styles.mainContainer]}>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
