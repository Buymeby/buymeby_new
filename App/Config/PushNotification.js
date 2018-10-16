import PushNotification from 'react-native-push-notification'
import { PushNotificationIOS, Platform } from 'react-native'

const configure = (api) => {
  PushNotification.configure({
    onRegister: function(token) {
      token.os = Platform.OS === 'ios' ? 'ios' : 'android'
      api.registerDevice(token)
    },

    onNotification: function(notification) {
     // console.tron.log(notification)

     if (Platform.OS === 'ios') notification.finish(PushNotificationIOS.FetchResult.NoData)
    },

    permissions: {
     alert: true,
     badge: true,
     sound: true
    },

    popInitialNotification: true,
    requestPermissions: true
  })
}

export {
 configure
}
