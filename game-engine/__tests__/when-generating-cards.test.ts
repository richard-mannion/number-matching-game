import { getNewGameCardState } from '../src/game';

describe("When generating a new game state", () => {

    it('The card count should be twice the max card number input', () => {
        const cards = getNewGameCardState(3, () => 0.5);
        expect(cards.length).toEqual(6);
    });
    it('The cards faces should not be shown', () => {
        const cards = getNewGameCardState(3, () => 0.5);
        const cardsWithFacesShown = cards.filter(x => x.isFaceShown === true);
        expect(cardsWithFacesShown.length).toEqual(0);
    });
    it('The cards should be un-matched', () => {
        const cards = getNewGameCardState(3, () => 0.5);
        const cardsWithFacesShown = cards.filter(x => x.isCardMatched === true);
        expect(cardsWithFacesShown.length).toEqual(0);
    });
    it('The cards should have correct numbers', () => {
        const cards = getNewGameCardState(2, () => 0.5);
        const cardsWithOne = cards.filter(x => x.dispayNumber === 1);
        const cardsWithTwo = cards.filter(x => x.dispayNumber === 2);
        
        expect(cardsWithOne.length).toEqual(2);
        expect(cardsWithTwo.length).toEqual(2);
    });
    it('The cards should have unique ids', () => {
        const cards = getNewGameCardState(2, () => 0.5);
        let cardsWithDuplicateKeys = 0;
        cards.forEach(card => {
            const cardsWithMatchingIds = cards.filter(x=> x.id === card.id).length;
            if(cardsWithMatchingIds>1){
                cardsWithDuplicateKeys++;
            }
        });
        expect(cardsWithDuplicateKeys).toEqual(0);
    });
    it('The cards should be randomised', () => {
        const cards = getNewGameCardState(2, () => 0.5);
        
        const sortedCards = [...cards].sort((a,b)=>a.id.localeCompare(b.id));
        let matchingIds = 0
        for(let i = 0;i<cards.length; i++){
            if(cards[i].id === sortedCards[i].id){
                matchingIds++; 
            }
        }

        expect(matchingIds).toBeLessThan(cards.length);
    });
}
);