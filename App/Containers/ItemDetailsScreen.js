import React, { Component } from 'react'
import { StyleSheet, Text, Image, ScrollView, View, TouchableOpacity, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import CartActions from '../Redux/CartRedux'
import VendorActions from '../Redux/VendorRedux'
import QuantitySelector from '../Components/QuantitySelector'
import {
  DropDownMenu,
  Title,
  Subtitle,
  Caption,
  Tile,
  Row,
  Button
} from '@shoutem/ui';

import styles from './Styles/ItemDetailsScreenStyles'

class ItemDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedQuantity: 1,
      modalVisible: false
    };
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: <ConnectedHeaderTitle navigation={navigation} />
    };
  };

  setQuantity = (quantity) => {
    this.setState({ selectedQuantity: quantity })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render () {
    const item = this.props.item
    const vendor = this.props.vendor
    const selectedQuantity = this.state.selectedQuantity

    return (
      <View style={styles.mainContainer}>
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
              <TouchableOpacity style={styles.button} onPress={this.props.blockVendor.bind(this, vendor, this)}>
                <Text style={styles.buttonText}>FLAG AND BLOCK</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setModalVisible(false) }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View style={styles.centered}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: item.image_file_src }}
                >
              </Image>
            </View>
            <Subtitle styleName="md-gutter-top">{item.description}</Subtitle>
            <Title styleName="md-gutter-top">${item.price} / {item.unit}</Title>
            <QuantitySelector
        			value={selectedQuantity}
        			minQuantity={1}
        			maxQuantity={item.quantity}
              onChange={this.setQuantity} />
            <TouchableOpacity style={styles.button} onPress={this.props.addToCart.bind(this, vendor, item, selectedQuantity)}>
              <Text style={styles.buttonText}>ADD TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setModalVisible(true) }}>
              <Text style={styles.cautionText}>report</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props.navigation.state.params,
    vendor: state.vendor.selected_vendor
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (vendor, item, quantity) => {
    dispatch(CartActions.add(vendor, item, quantity))
  },
  blockVendor: (vendor, component) => {
    component.setModalVisible(false)
    dispatch(VendorActions.vendorBlock(vendor))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsScreen)

const HeaderTitle = ({ navigation, text }) => <Subtitle navigation={navigation}>{text}</Subtitle>;
const ConnectedHeaderTitle = connect((state, props) => ({ text: props.navigation.state.params.item.name }))(HeaderTitle);
