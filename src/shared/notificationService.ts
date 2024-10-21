import admin from 'firebase-admin';
import config from '../config';

// Initialize Firebase Admin SDK if not already initialized
const initializeFirebase = () => {
  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(config.firebase_service as string);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
};

// Payload interface for notification data
type NotificationPayload = {
  title: string;
  body: string;
  [key: string]: any;
};

// Send notification to multiple tokens
const sendNotification = async (
  tokens: string,
  payload: NotificationPayload
) => {
  initializeFirebase();
  // const userTokens = [
  //   'fUwGnpwtTNam2Cq4LMxYos:APA91bF8cuFwWOLPJV2f2-HlCtC6q0mopSB3QGeSJYzwKI9mnEMviKrSM7_zpdTTtub2xk24LRVaXiUQFQ9LfH_WM09uSjNpvygBSTFPMbL6aEsO5-bba91Q1Ykn0k6EY195lbCWJOQp',
  // ];

  // Create notification payload
  const data = {
    token: tokens,
    notification: {
      title: payload.title,
      body: payload.body,
    },
  };

  try {
    const response = await admin.messaging().send(data);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export const Notification = {
  sendNotification,
};
