import { startNewGame } from '../src/index';

describe("When starting a new game", () => {

  it('The moves to win should be set to zero', () => {
    const gameState = startNewGame(10);
    expect(gameState.movesToWin).toEqual(0);
  });
  it('The game should be marked as not won', () => {
    const gameState = startNewGame(10);
    expect(gameState.isGameOver).toEqual(false);
  });
  it('The cards should be created', () => {
    const gameState = startNewGame(2);
    expect(gameState.cardState.length).toEqual(4);
  });
}
);