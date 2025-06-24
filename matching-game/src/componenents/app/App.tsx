import React, { useCallback, useRef } from 'react';
import './App.css';
import Card from '../card/Card';

import { startNewGame, GameState, flipUnmatchedCards, revealCard } from 'game-engine/dist';

function App() {
  const [gameState, setGameState] = React.useState<GameState>(startNewGame(4));
  const [highestCardNumber, setHighestCardNumber] = React.useState<number>(4);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = useCallback((index: number) => {
    revealCard(gameState, index);

    setGameState({ ...gameState });
    setTimeout(() => {
      if (gameState.isFlipUnmatchedRequired) {
        flipUnmatchedCards(gameState);
        //setGameState({ ...gameState });
      }
      if (gameState.isGameOver) {
        openModal();
      }
    }, 500);

  }, [gameState]);

  const handleHighestCardNumberChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setHighestCardNumber(parseInt(event.currentTarget.value));
  }, [setHighestCardNumber]);

  const handleNewGame = useCallback(() => {
    const newGameState = startNewGame(highestCardNumber);
    //setGameState(newGameState);
    closeModal();
  }, [highestCardNumber]);


  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  return (
    <><div className="App">
      <div className="game-controls">
        <span className="moves">Moves: {gameState.movesToWin}</span>

        <span><label htmlFor="highestCardNumber" className="highestCardNumberLabel">Highest Card Number:</label><input type="number" min="2" max="10" id="highestCardNumber" value={highestCardNumber} onChange={handleHighestCardNumberChange} /></span>
        <button onClick={handleNewGame} >New Game</button>
      </div>
      <div className="card-holder">
        {
          gameState.cardState.map((card, index) => <Card dispayNumber={card.dispayNumber} isFaceShown={card.isFaceShown} key={card.id} cardIndex={index} onClick={handleClick} />)
        }
      </div>
    </div>
      {<dialog ref={dialogRef} className="game-over-dialog">
        <div className="game-over-content">
          <h2>Congratulations!</h2>
          <p>You won in {gameState.movesToWin} moves.</p>
          <button onClick={handleNewGame}>New Game</button>
        </div>
      </dialog>
      }
    </>
  );
}

export default App;
