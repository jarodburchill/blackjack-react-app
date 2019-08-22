import React from 'react';
import styles from './styles/Status.module.css';

type StatusProps = {
  message: string
};

const Status: React.FC<StatusProps> = ({ message }) => {
  return (
    <div className={styles.statusContainer}>
      <div className={styles.status}>
        <h1 className={styles.message}>{message}</h1>
      </div>
    </div>
  );
}

export default Status;