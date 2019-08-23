import React, { useState, useEffect } from 'react';
import Status from './Status';
import Controls from './Controls';
import Hand from './Hand';
import jsonData from '../deck.json';

const App: React.FC = () => {
  const data = JSON.parse(JSON.stringify(jsonData.cards))
  const [deck, setDeck]: any[] = useState(data);

  const [userCards, setUserCards]: any[] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [userTurn, setUserTurn] = useState(true);

  const [dealerCards, setDealerCards]: any[] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);
  const [dealerTurn, setDealerTurn] = useState(false);

  const [init, setInit] = useState(true);
  const [message, setMessage] = useState('Hit or Stand?');
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true
  })

  useEffect(() => {
    if (init) {
      drawCard('user');
      drawCard('dealer-hidden');
      drawCard('user');
      drawCard('dealer');
      setInit(false);
    }
  }, [init]);

  useEffect(() => {
    calculate(userCards, setUserScore);
    setUserCount(userCount + 1);
  }, [userCards]);

  useEffect(() => {
    calculate(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
  }, [dealerCards]);

  useEffect(() => {
    if (userTurn) {
      if (userScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      }
      else if (userScore > 21) {
        bust();
      }
    }
  }, [userCount]);

  useEffect(() => {
    if (dealerTurn) {
      if (dealerScore >= 17) {
        checkWin();
      }
      else {
        drawCard('dealer');
      }
    }
  }, [dealerCount]);

  const resetGame = () => {
    console.clear();
    setDeck(data);

    setUserCards([]);
    setUserScore(0);
    setUserCount(0);
    setUserTurn(true);

    setDealerCards([]);
    setDealerScore(0);
    setDealerCount(0);
    setDealerTurn(false);

    setInit(true);
    setMessage('Hit or Stand?');
    setButtonState({
      hitDisabled: false,
      standDisabled: false,
      resetDisabled: true
    });
  }

  const drawCard = (player: string) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];
      deck.splice(randomIndex, 1);
      setDeck([...deck]);
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
      case 'test-u1':
        userCards.push({ 'value': 'A', 'suit': '♠', 'hidden': false });
        setUserCards([...userCards]);
        break;
      case 'test-u2':
        userCards.push({ 'value': 'K', 'suit': '♠', 'hidden': false });
        setUserCards([...userCards]);
        break;
      case 'test-d1':
        dealerCards.push({ 'value': 'A', 'suit': '♠', 'hidden': true });
        setUserCards([...userCards]);
        break;
      case 'test-d2':
        dealerCards.push({ 'value': '5', 'suit': '♠', 'hidden': false });
        setUserCards([...userCards]);
        break;
      default:
        break;
    }
  }

  const revealCard = () => {
    dealerCards.filter((card: any) => {
      if (card.hidden === true) {
        card.hidden = false;
      }
      return card;
    });
    setDealerCards([...dealerCards])
  }

  const calculate = (cards: any[], setScore: any) => {
    let total = 0;
    cards.forEach((card: any) => {
      if (card.hidden === false && card.value !== 'A') {
        switch (card.value) {
          case 'K':
            total += 10;
            break;
          case 'Q':
            total += 10;
            break;
          case 'J':
            total += 10;
            break;
          default:
            total += Number(card.value);
            break;
        }
      }
    });
    const aces = cards.filter((card: any) => {
      return card.value === 'A';
    });
    aces.forEach((card: any) => {
      if (card.hidden === false) {
        if ((total + 11) > 21) {
          total += 1;
        }
        else if ((total + 11) === 21) {
          if (aces.length > 1) {
            total += 1
          }
          else {
            total += 11
          }
        }
        else {
          total += 11;
        }
      }
    });
    setScore(total);
  }

  const hit = () => {
    drawCard('user');
  }

  const stand = () => {
    setUserTurn(false);
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setDealerTurn(true);
    revealCard();
  }

  const bust = () => {
    setUserTurn(false);
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setMessage('Bust!');
  }

  const checkWin = () => {
    setDealerTurn(false);
    if (userScore > dealerScore || dealerScore > 21) {
      setMessage('You Win!');
    }
    else if (dealerScore > userScore) {
      setMessage('Dealer Wins!');
    }
    else {
      setMessage('Tie!');
    }
  }

  return (
    <>
      <Status message={message} />
      <Controls buttonState={buttonState} hitEvent={hit} standEvent={stand} resetEvent={resetGame} />
      <Hand title={`Dealer's Hand (${dealerScore})`} cards={dealerCards} />
      <Hand title={`Your Hand (${userScore})`} cards={userCards} />
    </>
  );
}

export default App;
