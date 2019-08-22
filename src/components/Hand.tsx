import React from 'react';
import styles from './styles/Hand.module.css';
import Card from './Card';

type HandProps = {
  title: string,
  cards: any[]
};

const Hand: React.FC<HandProps> = ({ title, cards }) => {
  return (
    <div className={styles.handContainer}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.cardContainer}>
        {cards.map((card: any, index: number) => {
          return (
            <Card key={index} value={card.value} suit={card.suit} hidden={card.hidden} />
          );
        })}
      </div>
    </div>
  );
}

export default Hand;