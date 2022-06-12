import { useState } from "react";

import Key from "../types/Key";
import Guess from "../types/Guess";

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<Guess[][]>([
    ...Array(6).fill([...Array(5).fill({ key: "", color: "" })]) // each guess in an array
  ]);
  const [history, setHistory] = useState<string[]>([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [usedKeys, setUsedKeys] = useState<Key>({}); // {a: 'green', b: 'yellow'}

  // format a guess into an array of letters objects
  // e.g. 'a' -> [{ key: 'a', color: 'yellow' }]
  const formatGuess = (): Guess[] => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => ({
      key: l,
      color: "grey"
    }));

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = "";
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = "";
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess: Guess[]) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prev) => [...prev, currentGuess]);
    setTurn((prev) => prev + 1);
    setUsedKeys((prev) => {
      let newKeys = { ...prev };
      formattedGuess.forEach((letter: Guess) => {
        const currentColor = newKeys[letter.key];

        if (letter.color === "green") {
          newKeys[letter.key] = "green";
          return;
        }

        if (letter.color === "yellow" && currentColor !== "green") {
          newKeys[letter.key] = "yellow";
          return;
        }

        if (
          letter.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[letter.key] = "grey";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user press enter, add the new guess
  const handleKeyup = (e: KeyboardEvent) => {
    const { key } = e;

    if (key === "Backspace") {
      return setCurrentGuess(currentGuess.slice(0, -1));
    }

    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log("You have reached the maximum number of turns.");
        return;
      }

      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("You have already guessed this word.");
        return;
      }

      // check word is 5 chars long
      if (currentGuess.length !== 5) {
        console.log("Your word must be 5 characters long.");
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const clearStates = () => {
    setTurn(0);
    setCurrentGuess("");
    setGuesses([...Array(6).fill([...Array(5).fill({ key: "", color: "" })])]);
    setHistory([]);
    setIsCorrect(false);
    setUsedKeys({});
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
    clearStates
  };
};

export default useWordle;
