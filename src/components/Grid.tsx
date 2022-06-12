import Row from "./Row";
import Guess from "../types/Guess";

interface GridProps {
  currentGuess: string;
  guesses: Guess[][];
  turn: number;
}

const Grid = (props: GridProps): JSX.Element => {
  const { currentGuess, guesses, turn } = props;

  return (
    <div>
      {guesses.map((guess, index) => {
        if (turn === index) {
          return <Row key={index} currentGuess={currentGuess} />;
        }

        return <Row key={index} guess={guess} />;
      })}
    </div>
  );
};

export default Grid;
