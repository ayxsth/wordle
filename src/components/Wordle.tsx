import { useEffect, useState } from "react";

import Grid from "./Grid";
import Modal from "./Modal";
import Keypad from "./Keypad";
import useWordle from "../hooks/useWordle";

interface WordleProps {
  solution: string;
}

const Wordle = (props: WordleProps): JSX.Element => {
  const { solution } = props;

  const [showModal, setShowModal] = useState<boolean>(false);
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

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

  return (
    <>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </>
  );
};

export default Wordle;
