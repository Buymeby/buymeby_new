import { StyleSheet } from 'react-native'
import { Metrics, Colors, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  imageContainer: {
    width: Metrics.screenWidth * 0.8,
    height: Metrics.screenWidth * 0.8,
    paddingTop: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  button: {
    width: '40%',
    marginVertical: 10,
    backgroundColor: Colors.secondary
  },
  disabledButton: {
    width: '40%',
    marginVertical: 10,
    backgroundColor: Colors.steel
  },
  buttonText: {
    margin: 10,
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.bold
  },
  cautionText: {
    margin: 10,
    textAlign: 'center',
    color: Colors.bloodOrange,
    fontSize: Fonts.size.small
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  infoText: {
    color: Colors.charcoal
  }
})
