import { useCallback } from "react";
import './Card.css';

export interface CardProps {
    isFaceShown: boolean;
    dispayNumber: number;
    cardIndex: number;
    onClick: (index: number) => void;
}
const Card: React.FC<CardProps> = ({ isFaceShown, dispayNumber, cardIndex, onClick }) => {
    const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (onClick) {
            onClick(cardIndex);
        }
    }, [onClick, cardIndex]);
    return (
            isFaceShown ?
                <div className="card card--front-shown" onClick={handleClick}>{dispayNumber}</div>
                : <div className="card card--back-shown" onClick={handleClick}></div>

    );
}

export default Card;
