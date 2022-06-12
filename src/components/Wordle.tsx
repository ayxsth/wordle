import { useEffect, useState } from "react";

import Grid from "./Grid";
import Modal from "./Modal";
import Keypad from "./Keypad";
import useWordle from "../hooks/useWordle";

interface WordleProps {
  solution: string;
  setRandomWord: () => void;
}

const Wordle = (props: WordleProps): JSX.Element => {
  const { solution, setRandomWord } = props;

  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    currentGuess,
    handleKeyup,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    clearStates
  } = useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      window.removeEventListener("keyup", handleKeyup);

      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }

    if (turn > 5) {
      window.removeEventListener("keyup", handleKeyup);

      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  const restartGame = () => {
    clearStates();
    setRandomWord();
    setShowModal(false);
  };

  return (
    <>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          restartGame={restartGame}
        />
      )}
    </>
  );
};

export default Wordle;
