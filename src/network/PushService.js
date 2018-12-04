import Meteor from 'react-native-meteor';
// import { Actions } from 'react-native-router-flux';

import AppUtil from '../lib/util';
import AppConfig from '../constants/config';
// import Network from '../network';

import Constants from './constants';
import VCUtil from '../network/VCUtil';

//const PushNotification = require('react-native-push-notification');

class PushService {

  // init() {
  //   PushService._token = undefined;
  //   // setup notifications
  //   PushNotification.configure({
  //
  //     // (optional) Called when Token is generated (iOS and Android)
  //     onRegister(token) {
  //       AppUtil.debug(token, Constants.MODULE);
  //       // Alert.alert('TOKEN', JSON.stringify(token));
  //       PushService._token = token;
  //     },
  //
  //     // (required) Called when a remote or local notification is opened or received
  //     onNotification(notification) {
  //       // Alert.alert('NOTIFICATION', JSON.stringify(notification));
  //       AppUtil.debug(notification, 'PUSH Notification');
  //       console.log('Kumar pushy', notification);
  //
  //       // lets clear the badge
  //       PushNotification.setApplicationIconBadgeNumber(0);
  //       console.log('Kumar pushy', notification);
  //       if (notification && notification.ejson) {
  //         const pushData = JSON.parse(notification.ejson);
  //         const pushMsg = notification.message;
  //         console.log('Kumar push', pushData, pushMsg);
  //
  //         if (pushData.name === null && pushMsg === 'Started a call' && !notification.foreground) {
  //           PushService.handlePushAnswer(pushData);
  //         } else if (pushData.name === null && pushMsg === 'Started a call' && notification.foreground) {
  //           PushNotification.cancelAllLocalNotifications();
  //         } else if (pushData.name === null && pushMsg === 'Call Ended') {
  //           PushService.handlePushDecline();
  //         }
  //       }
  //
  //       // - lets take the user to the correct channel, refresh the contents
  //       // notification object have
  //       /*
  //       { foreground: false,
  //         soundname: 'default',
  //         'google.sent_time': 1507607930561,
  //         summaryText: '%n% new messages',
  //         msgcnt: '2',
  //         userInteraction: false,
  //         id: '1129599577',
  //         ejson: '{"host":"https://hostname/","rid":"otReF8uZJ6v5irTZC","sender":{"_id":"xvx4w2hLb29SYXsK4","username":"admin","name":"admin"},"type":"c","name":"new-test"}',
  //         image: 'https://instance/assets/favicon_192.png',
  //         notId: '579037750',
  //         style: 'inbox',
  //         title: '#new-test',
  //         'google.message_id': '0:1507607930564505%3889947b0034af1a',
  //         message: 'admin: test1 @eyal ',
  //         collapse_key: 'push' }
  //       */
  //       // take the user to correct channel onthe following logic
  //       //   - notification is remote (how to differentiate??)
  //       //   - userInteraction: true
  //       //   - app is not in foreground - foreground: false
  //       //   - ejson is there and rid is specified
  //       if (notification && notification.foreground === false && notification.userInteraction === true &&
  //         notification.ejson) {
  //         // Actions.app({ type: 'reset' });
  //         // Actions.helpView({ type: 'reset' });
  //         // const data = JSON.parse(notification.ejson);
  //         // if (data && data.rid) {
  //         //   const n = new Network();
  //         //   if (n.db && n.db.groups) {
  //         //   // lookup group object
  //         //     const gObj = n.db.groups.findById(data.rid);
  //         //     if (gObj) {
  //         //       AppUtil.debug(gObj.heading, 'PUSH - switch screen');
  //         //       Actions.chatDetail({ obj: gObj, title: gObj.heading });
  //         //     }
  //         //   }
  //         // }
  //       }
  //     },
  //
  //     // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is needed
  //     // to receive remote push notifications)
  //     senderID: Constants.SENDER_ID,
  //
  //     // IOS ONLY (optional): default: all - Permissions to register.
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },
  //
  //     // Should the initial notification be popped automatically
  //     // default: true
  //     popInitialNotification: true,
  //
  //     /**
  //       * (optional) default: true
  //       * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //       * - if not, you must call PushNotificationsHandler.requestPermissions() later
  //       */
  //     requestPermissions: true,
  //   });
  //
  //   PushService.handlePushAnswer = (pushData) => {
  //     console.log('Kumar push handlePushAnswer', pushData.rid, pushData.sender._id);
  //     console.log('Kumar push getInstance', VCUtil.getInstance());
  //     VCUtil.getInstance().incomingVC(pushData.rid, pushData.sender._id, pushData.sender.username);
  //   };
  //   PushService.handlePushDecline = () => {
  //     console.log('Kumar push handlePushDecline');
  //     VCUtil.getInstance().incomingVCDisconnect();
  //   };
  // }
  //
  // // register token, user to backend
  // register() {
  //   if (PushService._token) {
  //     // Set the data object
  //     const data = {
  //       id: Math.random().toString(36).slice(2), // Generate random string
  //       token: null,
  //       appName: AppConfig.appName || 'main',
  //       userId: AppConfig.userId,
  //       metadata: {},
  //     };
  //
  //     if (PushService._token.os === 'android') {
  //       data.token = {
  //         gcm: PushService._token.token,
  //       };
  //     } else if (PushService._token.os === 'ios') {
  //       data.token = {
  //         apn: PushService._token.token,
  //       };
  //     }
  //
  //     // console.log('==============> push =================', data);
  //     Meteor.call('raix:push-update', data, (err, res) => {
  //       AppUtil.debug('Push backend', JSON.stringify(res));
  //     });
  //     // clear badges on init
  //     PushNotification.setApplicationIconBadgeNumber(0);
  //   }
  // }
  //
  // // -- this method is just for reference
  // test() {
  //   PushNotification.localNotification({
  //   /* Android Only Properties */
  //     id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
  //     ticker: 'My Notification Ticker', // (optional)
  //     autoCancel: true, // (optional) default: true
  //     largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
  //     smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
  //     bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
  //     subText: 'This is a subText', // (optional) default: none
  //     color: 'red', // (optional) default: system default
  //     vibrate: true, // (optional) default: true
  //     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
  //     tag: 'some_tag', // (optional) add tag to message
  //     group: 'group', // (optional) add group to message
  //     ongoing: false, // (optional) set whether this is an "ongoing" notification
  //
  //   /* iOS only properties */
  //   // alertAction: // (optional) default: view
  //   // category: // (optional) default: null
  //   // userInfo: // (optional) default: null (object containing additional notification data)
  //
  //   /* iOS and Android properties */
  //     title: 'My Notification Title', // (optional, for iOS this is only used in apple
  //       // watch, the title will be the app name on other iOS devices)
  //     message: 'My Notification Message', // (required)
  //     playSound: false, // (optional) default: true
  //     soundName: 'default', // (optional) Sound to play when the notification
  //       // is shown. Value of 'default' plays the default sound. It can be set to a
  //       // custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will
  //       // look for the 'my_sound' audio file in 'res/raw' directory and play it.
  //       // default: 'default' (default sound is played)
  //     number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  //     repeatType: 'day', // (Android only) Repeating interval.
  //       // Could be one of `week`, `day`, `hour`, `minute, `time`. If specified
  //       // as time, it should be accompanied by one more parameter 'repeatTime` which
  //       // should the number of milliseconds between each interval
  //     actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
  //   });
  //   // // console.log('Set ******* notifications *******');
  //   // PushNotification.localNotificationSchedule({
  //   //   message: 'My Notification Message', // (required)
  //   //   date: new Date(Date.now() + (60 * 1000)), // in 60 secs
  //   // });
  // }
}

export default PushService;
