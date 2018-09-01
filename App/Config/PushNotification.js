import PushNotification from 'react-native-push-notification'
import { PushNotificationIOS } from 'react-native'

const configure = () => {
  console.tron.log('suck it')

  PushNotification.configure({
    onRegister: function(token) {
     console.tron.log('hoople motherfucker')
     console.tron.log(token)
    },

    onNotification: function(notification) {
     console.tron.log(notification)

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
