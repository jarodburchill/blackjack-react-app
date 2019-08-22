import React from 'react';
import styles from './styles/Controls.module.css';

type ControlsProps = {
  userTurn: boolean,
  hitEvent: any,
  standEvent: any,
  resetEvent: any
};

const Controls: React.FC<ControlsProps> = ({ userTurn, hitEvent, standEvent, resetEvent }) => {
  return (
    <div className={styles.controlsContainer}>
      <button onClick={() => hitEvent()} disabled={!userTurn} className={styles.button}>Hit</button>
      <button onClick={() => standEvent()} disabled={!userTurn} className={styles.button}>Stand</button>
      <button onClick={() => resetEvent()} className={styles.button}>Reset</button>
    </div>
  );
}

export default Controls;