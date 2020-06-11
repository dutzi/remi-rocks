import React, { useEffect, useState, useCallback } from 'react';
import styles from './index.module.scss';
import parseQuery from './parse-query';
import firebase from 'firebase/app';
import anime from 'animejs';

enum State {
  Adding = 1,
  Added,
  Error,
}

interface IReminder {
  message: string;
  timestamp: number;
}

const logger = {
  log: (...props: any) => {
    if (localStorage.getItem('showAdminTools') === 'true') {
      console.log(...props);
    }
  },
};

function App() {
  const [message, setMessage] = useState<string>();
  const [time, setTime] = useState<number>();
  const [token, setToken] = useState<string>();
  const [prettyTime, setPrettyTime] = useState<string>();
  const [state, setState] = useState<State>();
  const [reminders, setReminders] = useState<IReminder[]>();

  const sendTokenToServer = useCallback((token: string) => {
    const uid = firebase.auth().currentUser?.uid;

    if (!uid) {
      throw new Error('missing uid');
    }

    return firebase.functions().httpsCallable('setToken')({ token });
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    sendTokenToServer(token);
  }, [token, sendTokenToServer]);

  useEffect(() => {
    firebase
      .auth()
      .signInAnonymously()
      .then((res) => {
        const messaging = firebase.messaging();
        messaging.usePublicVapidKey(
          'BNhBE-E5yZZOIGvvKkrf6Sfgs2GhR5G7v0N04rNiPSeKtftS5_J-C2uuh7M4IKganSLYAp61N7Z6001klipvpGo'
        );

        messaging
          .getToken()
          .then((currentToken) => {
            if (currentToken) {
              setToken(currentToken);
              logger.log(currentToken);
              // updateUIForPushEnabled(currentToken);
            } else {
              logger.log('no token');
              // Show permission request.
              logger.log(
                'No Instance ID token available. Request permission to generate one.'
              );
              // Show permission UI.
              // updateUIForPushPermissionRequired();
              // setTokenSentToServer(false);
            }
          })
          .catch((err) => {
            logger.log('An error occurred while retrieving token. ', err);
            // showToken('Error retrieving Instance ID token. ', err);
            // setTokenSentToServer(false);
          });

        messaging.onTokenRefresh(() => {
          messaging
            .getToken()
            .then((refreshedToken) => {
              logger.log('Token refreshed.');
              // Indicate that the new Instance ID token has not yet been sent to the
              // app server.
              // setTokenSentToServer(false);
              // Send Instance ID token to app server.
              setToken(refreshedToken);
              logger.log({ refreshedToken });
              // ...
            })
            .catch((err) => {
              logger.log('Unable to retrieve refreshed token ', err);
              // showToken('Unable to retrieve refreshed token ', err);
            });
        });
      });
  }, []);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const query = search.get('q');

    if (!query) {
      return;
    }

    const { message, time, prettyTime, error } = parseQuery(query);

    if (error) {
      return;
    }

    if (message === undefined || time === undefined) {
      return;
    }

    setMessage(message);
    setTime(time);
    setPrettyTime(prettyTime);
    const t = anime.timeline({});
    t.add({
      targets: '[data-new-reminder]',
      translateY: [100, 0],
      opacity: [0, 1],
    });
  }, []);

  useEffect(() => {
    if (!token || !message || !time) {
      return;
    }

    firebase
      .functions()
      .httpsCallable('addNotification')({
        message,
        timestamp: new Date(new Date().getTime() + time * 1000).getTime(),
      })
      .then(() => {
        setState(State.Added);
        anime({
          targets: '[data-left-col]',
          // translateX: [0, -100],
        });
        anime({
          targets: '[data-status]',
          translateX: [-200, 0],
          opacity: [0, 1],
        });
      });
  }, [token, message, time]);

  useEffect(() => {
    setTimeout(() => {
      setReminders([
        { message: 'feed the cat', timestamp: 1591906136335 },
        { message: 'go buy milk', timestamp: 1591906130000 },
      ]);
    }, 1000);
    // firebase
    //   .functions()
    //   .httpsCallable('getReminders')()
    //   .then((res) => {
    //     setReminders(res.data);
    //   });
  }, []);

  useEffect(() => {
    Notification.requestPermission(function (status) {
      logger.log('Notification permission status:', status);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.newReminder} data-new-reminder>
        <div className={styles.leftCol} data-left-col>
          <div className={styles.message}>
            {message && <>“{message}”&nbsp;</>}
          </div>
          <div className={styles.time}>{prettyTime}</div>
        </div>
        {/* <div data-status className={styles.status}>
          added!
        </div> */}
      </div>
      <div className={styles.reminders}>
        {reminders?.map((notification) => (
          <div className={styles.reminder}>{notification.message}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
