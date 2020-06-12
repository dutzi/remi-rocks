import React from 'react';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <div>
        a side project by <a href="https://dutzi.party">dutzi</a>
      </div>
      <a href="https://github.com/dutzi/remi-rocks">
        <img className={styles.github} alt="GitHub" src="/github.svg" />
      </a>
    </div>
  );
}
