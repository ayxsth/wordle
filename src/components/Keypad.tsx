import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import Key from "../types/Key";

interface KeypadProps {
  usedKeys: Key;
}

const Keypad = (props: KeypadProps) => {
  const { usedKeys } = props;
  const [letters, setLetters] = useState<Key[]>();

  useEffect(() => {
    const fetchSolution = async () => {
      const response: AxiosResponse<Key[]> = await axios.get(
        "https://ayxsth.github.io/wordle/data/letters.json"
      );

      // for local
      // const response: AxiosResponse<Key[]> = await axios.get(
      //   "http://localhost:3001/letters"
      // );

      const data: Key[] = response.data;

      setLetters(data);
    };

    fetchSolution();
  }, []);

  return (
    <div className="keypad">
      {letters ? (
        letters.map((letter: Key) => {
          const color = usedKeys[letter.key];

          return (
            <div key={letter.key} className={color}>
              {letter.key}
            </div>
          );
        })
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Keypad;
