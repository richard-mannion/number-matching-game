import { GameState, startNewGame, revealCard, flipUnmatchedCards } from '../src/game';

const sortCards = (gameState: GameState) => {
    gameState.cardState.sort((a, b) => a.id.localeCompare(b.id));
}

describe("When revealing cards", () => {

    it('It should record the moves', () => {
        const gameState = startNewGame(2);
        sortCards(gameState);

        revealCard(gameState, 1);

        expect(gameState.movesToWin).toEqual(1);
    });

    describe("When the first card is revealed", () => {

        it('Its face should be revealed', () => {
            const gameState = startNewGame(2);
            sortCards(gameState);

            revealCard(gameState, 1);

            expect(gameState.cardState[1].isFaceShown).toEqual(true);
        });
        it('No other faces should be revealed', () => {
            const gameState = startNewGame(2);
            sortCards(gameState);

            revealCard(gameState, 1);

            const cardsWithFacesShown = gameState.cardState.filter(x => x.isFaceShown === true);
            expect(cardsWithFacesShown.length).toEqual(1);
        });
        it('the game should not be won', () => {
            const gameState = startNewGame(2);
            sortCards(gameState);

            revealCard(gameState, 1);

            expect(gameState.isGameOver).toEqual(false);
        });
        it('A card flip should not be required', () => {
            const gameState = startNewGame(2);
            sortCards(gameState);

            revealCard(gameState, 1);

            expect(gameState.isFlipUnmatchedRequired).toEqual(false);
        });
    });

    describe("When the second card is revealed", () => {

        it('Its face should be revealed', () => {
            const gameState = startNewGame(4);
            sortCards(gameState);
            revealCard(gameState, 1);

            revealCard(gameState, 2);

            expect(gameState.cardState[2].isFaceShown).toEqual(true);
        });
        it('Only the two card faces should be revealed', () => {
            const gameState = startNewGame(4);
            sortCards(gameState);
            revealCard(gameState, 1);

            revealCard(gameState, 2);

            const cardsWithFacesShown = gameState.cardState.filter(x => x.isFaceShown === true);
            expect(cardsWithFacesShown.length).toEqual(2);
        });
    });

    describe("When the second card is revealed and it does not match the first card", () => {
        it('The match should still be false', () => {
            const gameState = startNewGame(4);
            sortCards(gameState);
            revealCard(gameState, 1);
            revealCard(gameState, 2);

            expect(gameState.cardState[1].isCardMatched).toEqual(false);
            expect(gameState.cardState[2].isCardMatched).toEqual(false);
        });

        it('A card flip should be required', () => {
            const gameState = startNewGame(2);
            sortCards(gameState);

            revealCard(gameState, 1);

            revealCard(gameState, 2);

            expect(gameState.isFlipUnmatchedRequired).toEqual(true);
        });
        describe("When flupping the unmatched cards", () => {
            it('The card faces should not be shows', () => {
                const gameState = startNewGame(4);
                sortCards(gameState);
                revealCard(gameState, 1);
                revealCard(gameState, 2);

                flipUnmatchedCards(gameState);

                expect(gameState.cardState[1].isFaceShown).toEqual(false);
                expect(gameState.cardState[2].isFaceShown).toEqual(false);
            });

            it('A card flip should not be required', () => {
                const gameState = startNewGame(4);
                sortCards(gameState);
                revealCard(gameState, 1);
                revealCard(gameState, 2);

                flipUnmatchedCards(gameState);

                expect(gameState.isFlipUnmatchedRequired).toEqual(false);
            });
        });
    });

    describe("When the second card is revealed and it does match the first card", () => {
        it('The match should be true', () => {
            const gameState = startNewGame(4);
            sortCards(gameState);
            revealCard(gameState, 0);

            revealCard(gameState, 1);

            expect(gameState.cardState[0].isCardMatched).toEqual(true);
            expect(gameState.cardState[1].isCardMatched).toEqual(true);
        });
        it('A card flip should not be required', () => {
            const gameState = startNewGame(2);
            sortCards(gameState);

            revealCard(gameState, 0);

            revealCard(gameState, 1);

            expect(gameState.isFlipUnmatchedRequired).toEqual(false);
        });
    });

    describe("When the second card is revealed and it does match the first card", () => {
        it('The match should be true', () => {
            const gameState = startNewGame(4);
            sortCards(gameState);
            revealCard(gameState, 0);

            revealCard(gameState, 1);

            expect(gameState.cardState[0].isCardMatched).toEqual(true);
            expect(gameState.cardState[1].isCardMatched).toEqual(true);
        });
    });


    describe("When revealing a third card", () => {
        it('it should not be revealed', () => {
            const gameState = startNewGame(4);
            sortCards(gameState);
            revealCard(gameState, 1);
            revealCard(gameState, 2);
            revealCard(gameState, 3);

            expect(gameState.cardState[3].isFaceShown).toEqual(false);
        });
    });

    describe("When all cards are matched", () => {
        it("The game should be won", () => {
            const gameState = startNewGame(2);
            sortCards(gameState);
            revealCard(gameState, 0);
            revealCard(gameState, 1);
            revealCard(gameState, 2);
            revealCard(gameState, 3);

            flipUnmatchedCards(gameState);

            expect(gameState.isGameOver).toEqual(true);
        });
    });


    describe("When revealing a revealed card", () => {
        it('it should do nothing', () => {
            const gameState = startNewGame(4);
            sortCards(gameState);
            revealCard(gameState, 1);

            revealCard(gameState, 1);

            const cardsWithFacesShown = gameState.cardState.filter(x => x.isFaceShown === true);
            expect(cardsWithFacesShown.length).toEqual(1);
            expect(gameState.cardState[1].isFaceShown).toEqual(true);
        });
    });

});