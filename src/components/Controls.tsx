import React, { useState } from 'react';
import styles from './styles/Controls.module.css';

type ControlsProps = {
  balance: number,
  gameState: number,
  buttonState: any,
  betEvent: any,
  hitEvent: any,
  standEvent: any,
  resetEvent: any
};

const Controls: React.FC<ControlsProps> = ({ balance, gameState, buttonState, betEvent, hitEvent, standEvent, resetEvent }) => {
  const [amount, setAmount] = useState(10);

  const amountChange = (e: any) => {
    setAmount(e.target.value);
  }

  const getControls = () => {
    if (gameState === 0) {
      return (
        <div className={styles.controlsContainer}>
          <div className={styles.betContainer}>
            <h4>Amount:</h4>
            <input type='number' min='10' max={balance} step='10' value={amount} onChange={amountChange} className={styles.input} />
          </div>
          <button onClick={() => betEvent(amount)} className={styles.button}>Bet</button>
        </div>
      );
    }
    else {
      return (
        <div className={styles.controlsContainer}>
          <button onClick={() => hitEvent()} disabled={buttonState.hitDisabled} className={styles.button}>Hit</button>
          <button onClick={() => standEvent()} disabled={buttonState.standDisabled} className={styles.button}>Stand</button>
          <button onClick={() => resetEvent()} disabled={buttonState.resetDisabled} className={styles.button}>Reset</button>
        </div>
      );
    }
  }

  return (
    <>
      {getControls()}
    </>
  );
}

export default Controls;