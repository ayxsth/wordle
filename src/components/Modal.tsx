interface ModalProps {
  isCorrect: boolean;
  turn: number;
  solution: string;
  restartGame: () => void;
}

const Modal = (props: ModalProps) => {
  const { isCorrect, turn, solution, restartGame } = props;

  return (
    <div className="modal">
      <div className="modal-container">
        {isCorrect && (
          <>
            <h1>You Win!</h1>
            <p className="solution">{solution}</p>
            <p>You found the solution in {turn} guesses. :)</p>
          </>
        )}

        {!isCorrect && (
          <>
            <h1>Nevermind!</h1>
            <p className="solution">{solution}</p>
            <p>Better luck next time. :)</p>
          </>
        )}
        <button onClick={restartGame}>Play Again</button>
      </div>
    </div>
  );
};

export default Modal;
