import React from 'react';
import styles from './styles/Controls.module.css';

type ControlsProps = {
  buttonState: any,
  hitEvent: any,
  standEvent: any,
  resetEvent: any
};

const Controls: React.FC<ControlsProps> = ({ buttonState, hitEvent, standEvent, resetEvent }) => {
  return (
    <div className={styles.controlsContainer}>
      <button onClick={() => hitEvent()} disabled={buttonState.hitDisabled} className={styles.button}>Hit</button>
      <button onClick={() => standEvent()} disabled={buttonState.standDisabled} className={styles.button}>Stand</button>
      <button onClick={() => resetEvent()} disabled={buttonState.resetDisabled} className={styles.button}>Reset</button>
    </div>
  );
}

export default Controls;