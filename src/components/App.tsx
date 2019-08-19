import React from 'react';
import logo from './logo.svg';

const App: React.FC = () => {
  const deck = (require('../deck.json')).cards;
  const activeCard = deck[Math.floor(Math.random() * 52)];
  let suitSymbol = '';
  switch (activeCard.suit) {
    case 'spades':
      suitSymbol = '♠'
      break;
    case 'diamonds':
      suitSymbol = '♦'
      break;
    case 'clubs':
      suitSymbol = '♣'
      break;
    case 'hearts':
      suitSymbol = '♥'
      break;
    default:
      break;
  }
  return (
    <div>
      <h1>{activeCard.value}</h1>
      <h1>{suitSymbol}</h1>
    </div>
  );
}

export default App;
