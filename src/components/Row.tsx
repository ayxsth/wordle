import Guess from "../types/Guess";

interface RowProps {
  guess?: Guess[];
  currentGuess?: string;
}

const Row = (props: RowProps): JSX.Element => {
  const { guess, currentGuess } = props;

  if (guess) {
    return (
      <div className="row">
        {guess.map((letter: Guess, index: number) => (
          <div key={index} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    const letters = currentGuess.split("");
    return (
      <div className="row current">
        {letters.map((letter: string, index: number) => {
          return (
            <div key={index} className="filled">
              {letter}
            </div>
          );
        })}

        {[...Array(5 - currentGuess.length)].map((_, index) => (
          <div key={index} className="empty" />
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Row;
