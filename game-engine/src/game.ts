export interface GameState {
    isGameOver: boolean;
    movesToWin: number;
    isFlipUnmatchedRequired: boolean
    cardState: CardState[]
}

interface CardState {
    isFaceShown: boolean;
    isCardMatched: boolean;
    id: string;
    dispayNumber: number;
}

export const getNewGameCardState = (maxNumberOnCard: number, rnd: () => number): CardState[] => {
    let cards: CardState[] = [];
    for (let i: number = 1; i <= maxNumberOnCard; i++) {
        cards.push({ isFaceShown: false, isCardMatched: false, dispayNumber: i, id: `card${i}-a` });
        cards.push({ isFaceShown: false, isCardMatched: false, dispayNumber: i, id: `card${i}-b` });
    }
    return shuffleWithRng(cards, rnd);
}

export const startNewGame = (maxNumberOnCard: number): GameState => {
    return {
        isGameOver: false,
        movesToWin: 0,
        isFlipUnmatchedRequired: false,
        cardState: getNewGameCardState(maxNumberOnCard, Math.random),
    }
}

export const revealCard = (gameState: GameState, cardIndex: number) => {
    const existingRevealedCards = gameState.cardState.filter(x => x.isFaceShown === true && x.isCardMatched === false)
    if (existingRevealedCards.length > 1) {
        return;
    }

    gameState.cardState[cardIndex].isFaceShown = true;
    gameState.movesToWin++;

    if (existingRevealedCards.length > 0 && existingRevealedCards[0].dispayNumber === gameState.cardState[cardIndex].dispayNumber) {
        gameState.cardState[cardIndex].isCardMatched = true;
        existingRevealedCards[0].isCardMatched = true;
    }
    else if(existingRevealedCards.length === 1) {
        gameState.isFlipUnmatchedRequired = true;
    }


    const totalCardsMatched = gameState.cardState.filter(x => x.isCardMatched).length;
    gameState.isGameOver = totalCardsMatched === gameState.cardState.length;

}

export const flipUnmatchedCards = (gameState: GameState) => {
    gameState.cardState.forEach(x => {
        if (x.isFaceShown && !x.isCardMatched) {
            x.isFaceShown = false;
        }
    });
    gameState.isFlipUnmatchedRequired = false;
}

export const shuffleWithRng = <T>(array: T[], rng: () => number): T[] => {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
