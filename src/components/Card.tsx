import React from 'react';
import styles from './styles/Card.module.css';

type CardProps = {
  value: string;
  suit: string;
};

const Card: React.FC<CardProps> = ({ value, suit }) => {
  const getColor = () => {
    if (suit === '♠' || suit === '♣') {
      return styles.black;
    }
    else {
      return styles.red;
    }
  }

  return (
    <div className={getColor()}>
      <div className={styles.card}>
        <h1 className={styles.value}>{value}</h1>
        <h1 className={styles.suit}>{suit}</h1>
      </div>
    </div>
  );
}

export default Card;