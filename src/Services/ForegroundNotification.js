// notificationService.js
import notifee, { AndroidStyle, AndroidImportance, AndroidVisibility } from '@notifee/react-native';

export const ForegroundNotification = async () => {
  // 1. Create a notification channel with high importance for heads-up display
  const channelId = await notifee.createChannel({
    id: 'important',
    name: 'Important Notifications',
    lights: true,
    vibration: true,
    importance: AndroidImportance.HIGH, // This is crucial for heads-up notifications
    visibility: AndroidVisibility.PUBLIC,
  });

  // 2. Display the notification with high priority settings
  await notifee.displayNotification({
    title: 'Hello!',
    body: 'Your Turf is ready come 5:30pm 🚀',
    android: {
      channelId,
      smallIcon: 'ic_launcher', // Replace with your app's icon name
      largeIcon: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg',
      color: '#4CAF50', // Optional: customize notification color
      priority: 'high', // Set high priority
      pressAction: {
        id: 'default',
      },
      // This ensures the notification pops up even if app is in foreground
      fullScreenAction: {
        id: 'default',
      },
    },
  });
};