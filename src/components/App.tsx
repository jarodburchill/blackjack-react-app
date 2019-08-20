import React, { useState, useEffect } from 'react';
import styles from './styles/App.module.css';
import Card from './Card';

const App: React.FC = () => {
  const deck = (require('../deck.json')).cards;
  const [userCards, setUserCards]: any[] = useState([]);
  const [dealerCards, setDealerCards]: any[] = useState([]);

  const dealCard = (player: string, value: string, suit: string) => {
    if (player === 'user') {
      setUserCards([...userCards, { 'value': value, 'suit': suit }]);
    }
    else if (player === 'dealer') {
      setDealerCards([...dealerCards, { 'value': value, 'suit': suit }]);
    }
  }

  const drawCard = (player: string) => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const activeCard = deck[randomIndex];
    deck.splice(randomIndex, 1);
    console.log('Last Pulled Card:', activeCard);
    console.log('Remaining Cards:', deck.length);
    switch (activeCard.suit) {
      case 'spades':
        dealCard(player, activeCard.value, '♠');
        break;
      case 'diamonds':
        dealCard(player, activeCard.value, '♦');
        break;
      case 'clubs':
        dealCard(player, activeCard.value, '♣');
        break;
      case 'hearts':
        dealCard(player, activeCard.value, '♥');
        break;
      default:
        break;
    }
  }

  const clickHandler = () => {
    if (deck.length > 0) {
      drawCard('user');
    }
    else {
      alert('All cards have been drawn');
    }
  }

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      drawCard('user');
    }
  }, []);

  console.log('User Cards Array:', userCards);
  console.log('Dealer Cards Array:', dealerCards);

  return (
    <>
      <button onClick={clickHandler}>Hit</button>
      <button onClick={clickHandler}>Stand</button>
      <div className={styles.handContainer}>
        <h1>Your Hand</h1>
        <div className={styles.cardContainer}>
          {userCards.map((card: any, index: number) => {
            return (
              <Card key={index} value={card.value} suit={card.suit} />
            );
          })}
        </div>
      </div>
      <div className={styles.handContainer}>
        <h1>Dealer's Hand</h1>
        <div className={styles.cardContainer}>
          {dealerCards.map((card: any, index: number) => {
            return (
              <Card key={index} value={card.value} suit={card.suit} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
