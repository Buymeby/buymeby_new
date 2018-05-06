import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../Themes'

export default class Chevron extends React.Component {
  render() {
    return (
      <Icon name="chevron-right" style={{color: Colors.primary}}/>
    )
  }
}
