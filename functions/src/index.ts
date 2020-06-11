import * as admin from 'firebase-admin';

admin.initializeApp();

import * as functions from 'firebase-functions';

function sendNotification(
  doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
) {
  const notification = doc.data();
  return admin
    .firestore()
    .doc(`/users/${notification.uid}`)
    .get()
    .then((userDoc) => {
      const user = userDoc.data();
      if (!user) {
        return;
      }

      return admin.messaging().sendToDevice(user.token, {
        notification: {
          title: notification.message,
        },
      });
    })
    .then(() => {
      return doc.ref.update({ status: 'sent' });
    });
}

export const addNotification = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    return { error: true, errorCode: 'auth/user-logged-out' };
  }

  if (!data.message) {
    return { error: true, errorCode: 'req/missing-message' };
  }

  if (!data.timestamp) {
    return { error: true, errorCode: 'auth/missing-timestamp' };
  }

  const uid = context.auth.uid;

  await admin.firestore().collection('/notifications').add({
    status: 'pending',
    message: data.message,
    timestamp: data.timestamp,
    uid,
  });

  return { success: true };
});

export const setToken = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    return { error: true, errorCode: 'auth/user-logged-out' };
  }

  if (!data.token) {
    return { error: true, errorCode: 'req/missing-token' };
  }

  const uid = context.auth.uid;

  await admin.firestore().doc(`/users/${uid}`).set({ token: data.token });

  return { success: true };
});

function createNotificationCall(delay: number) {
  return async (context: functions.EventContext) => {
    await new Promise((resolve) => setTimeout(resolve, delay * 1000));

    const notifications = await admin
      .firestore()
      .collection('/notifications')
      .where('status', '==', 'pending')
      .get();

    const now = new Date().getTime();

    await Promise.all(
      notifications.docs.map((doc) => {
        const notification = doc.data();
        if (now > notification.timestamp) {
          return sendNotification(doc);
        }
        return Promise.resolve(null);
      })
    );
  };
}

export const sendNotifications_0 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(0));

export const sendNotifications_1 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(3));

export const sendNotifications_2 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(6));

export const sendNotifications_3 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(9));

export const sendNotifications_4 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(12));

export const sendNotifications_5 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(15));

export const sendNotifications_6 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(18));

export const sendNotifications_7 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(21));

export const sendNotifications_8 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(24));

export const sendNotifications_9 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(27));

export const sendNotifications_10 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(30));

export const sendNotifications_11 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(33));

export const sendNotifications_12 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(36));

export const sendNotifications_13 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(39));

export const sendNotifications_14 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(42));

export const sendNotifications_15 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(45));

export const sendNotifications_16 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(48));

export const sendNotifications_17 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(51));

export const sendNotifications_18 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(54));

export const sendNotifications_19 = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(createNotificationCall(57));
