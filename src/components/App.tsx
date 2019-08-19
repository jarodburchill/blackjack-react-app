import React from 'react';

const App: React.FC = () => {
  const deck = (require('../deck.json')).cards;
  const randomIndex = Math.floor(Math.random() * 52);
  const activeCard = deck[randomIndex];
  deck.splice(randomIndex, 1);
  console.log(deck);
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
