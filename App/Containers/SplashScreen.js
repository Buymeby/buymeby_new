import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'

export default class SplashScreen extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.cover}
          source={Images.splash}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch"
    },
    cover: {
        flex: 1,
        width: null,
        height: null
    }
});
