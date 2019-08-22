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
      <button onClick={() => hitEvent()} disabled={!userTurn}>Hit</button>
      <button onClick={() => standEvent()} disabled={!userTurn}>Stand</button>
      <button onClick={() => resetEvent()}>Reset</button>
    </div>
  );
}

export default Controls;