import { Notification } from 'electron';
import { join } from 'path';


const sendNotification = (title, body) => {
  const notification = new Notification({
    title,
    body,
    icon: join(__dirname, '../../resources/icon.png'),
  });

  notification.show();

  // Optional: Log when notification is clicked
  notification.on('click', () => {
    console.log('Notification clicked');
  });
};

export default sendNotification;
