import React from 'react';
import styles from './index.module.scss';
import { ReactComponent as Logo } from '../../logo.svg';
import Footer from '../../components/Footer';

export default function Home() {
  const modifierKey = navigator.platform === 'MacIntel' ? 'Cmd' : 'Ctrl';
  return (
    <div className={styles.wrapper}>
      <header>
        <Logo />
        <div className={styles.fold}>
          <div className={styles.whiteOverlay}></div>
        </div>
      </header>

      <main>
        <p>Set quick reminders straight from Chrome’s URL bar.</p>
        <br />
        <p>Hit {modifierKey}+L</p>
        <p>
          Type <span className={styles.highlight}>remi</span> and hit Tab
        </p>
        <p>
          Type something like{' '}
          <span className={styles.highlight}>pizza oven 12m</span>
        </p>
        <p>Hit Enter (you can then close the tab)</p>
        <p>
          <span className={styles.highlight}>12 minutes</span> later you’ll get
          a notification
        </p>
      </main>
      <Footer />
    </div>
  );
}
