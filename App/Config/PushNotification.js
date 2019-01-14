import PushNotification from 'react-native-push-notification'
import { PushNotificationIOS, Platform } from 'react-native'

const configure = (api) => {
  // console.tron.log("Push notification configured")
  PushNotification.configure({
    onError: function(e) {
      // console.tron.log(e)
    },
    onRegister: function(token) {
      api.registerDevice(token)
    },

    onNotification: function(notification) {
     // console.tron.log(notification)

     if (Platform.OS === 'ios') notification.finish(PushNotificationIOS.FetchResult.NoData)
    },

    senderID: '819870663726',
    permissions: {
     alert: true,
     badge: true,
     sound: true
    },

    popInitialNotification: true,
    requestPermissions: true
  })
  PushNotification.requestPermissions()
}

export {
 configure
}
