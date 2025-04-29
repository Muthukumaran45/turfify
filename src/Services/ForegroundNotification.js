// notificationService.js
import notifee, {AndroidStyle} from '@notifee/react-native';

export const ForegroundNotification = async () => {
  // 1. Create a notification channel (Android requires it)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // 2. Display the notification
  await notifee.displayNotification({
    title: 'Hello!',
    body: 'Your Turf is ready come 5:30pm 🚀',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      }, style: {
        type: AndroidStyle.BIGPICTURE,
        picture: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg',
      },
    },
  });
};
