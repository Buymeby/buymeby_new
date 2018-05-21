import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/ScreenStyles'

class HelpScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={[styles.centered, styles.section]}>
            <Text>
              {`Coming soon... you got this ¯\\_(ツ)_/¯`}
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen)
