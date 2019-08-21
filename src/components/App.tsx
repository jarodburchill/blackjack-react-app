import React, { useState, useEffect } from 'react';
import styles from './styles/App.module.css';
import Card from './Card';

const App: React.FC = () => {
  const [deck, setDeck]: any[] = useState((require('../deck.json')).cards);
  const [userCards, setUserCards]: any[] = useState([]);
  const [dealerCards, setDealerCards]: any[] = useState([]);

  const dealCard = (player: string, value: string, suit: string) => {
    switch (player) {
      case 'user':
        userCards.push({ 'value': value, 'suit': suit, 'hidden': false });
        setUserCards([...userCards]);
        break;
      case 'dealer':
        dealerCards.push({ 'value': value, 'suit': suit, 'hidden': false });
        setDealerCards([...dealerCards]);
        break;
      case 'dealer-hidden':
        dealerCards.push({ 'value': value, 'suit': suit, 'hidden': true });
        setDealerCards([...dealerCards]);
        break;
      default:
        break;
    }
  }

  const drawCard = (player: string) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];
      deck.splice(randomIndex, 1);
      setDeck([...deck]);
      console.log('Last Drawn Card:', card);
      console.log('Remaining Cards:', deck.length);
      switch (card.suit) {
        case 'spades':
          dealCard(player, card.value, '♠');
          break;
        case 'diamonds':
          dealCard(player, card.value, '♦');
          break;
        case 'clubs':
          dealCard(player, card.value, '♣');
          break;
        case 'hearts':
          dealCard(player, card.value, '♥');
          break;
        default:
          break;
      }
    }
    else {
      alert('All cards have been drawn');
    }
  }

  useEffect(() => {
    drawCard('user');
    drawCard('dealer-hidden');
    drawCard('user');
    drawCard('dealer');
  }, []);

  console.log('User Cards Array:', userCards);
  console.log('Dealer Cards Array:', dealerCards);

  return (
    <>
      <button onClick={() => drawCard('user')}>User</button>
      <button onClick={() => drawCard('dealer')}>Dealer</button>
      <div className={styles.handContainer}>
        <h1>Your Hand</h1>
        <div className={styles.cardContainer}>
          {userCards.map((card: any, index: number) => {
            return (
              <Card key={index} value={card.value} suit={card.suit} hidden={card.hidden} />
            );
          })}
        </div>
      </div>
      <div className={styles.handContainer}>
        <h1>Dealer's Hand</h1>
        <div className={styles.cardContainer}>
          {dealerCards.map((card: any, index: number) => {
            return (
              <Card key={index} value={card.value} suit={card.suit} hidden={card.hidden} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
