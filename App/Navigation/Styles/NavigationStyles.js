import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
    borderBottomColor: Colors.background,
    elevation: 0,
    shadowOpacity: 0
  },
  tabHeader: {
    backgroundColor: Colors.background
  },
  tabLabel: {
    color: Colors.tertiary
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  headerIconLeft: {
    paddingLeft: 10,
    color: Colors.secondary
  },
  headerIconRight: {
    paddingRight: 10,
    color: Colors.secondary
  }
})
