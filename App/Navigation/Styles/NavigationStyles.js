import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

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
  },
  sideMenuContainer: {
    marginVertical: Metrics.section,
    padding: Metrics.baseMargin
  },
  sideMenuItem: {
    flex:1,
    flexDirection:'row',
    paddingVertical: Metrics.baseMargin
  },
  menuIcon: {
    paddingRight: Metrics.baseMargin,
    color: Colors.secondary
  },
  menuText: {
    color: Colors.coal,
    fontSize: 18
  }
})
