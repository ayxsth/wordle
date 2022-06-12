import { useCallback, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import Solution from "./types/Solution";
import Wordle from "./components/Wordle";

import "./assets/css/App.css";

function App() {
  const [solution, setSolution] = useState<string | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  const fetchSolution = async () => {
    const response: AxiosResponse<Solution[]> = await axios.get(
      "http://localhost:3001/solutions"
    );
    const data: Solution[] = response.data;
    setSolutions(data);
  };

  const setRandomWord = useCallback(() => {
    const word = solutions[~~(Math.random() * solutions.length)].word;

    setSolution(word);
  }, [solutions, setSolution]);

  useEffect(() => {
    fetchSolution();
  }, [setSolution]);

  useEffect(() => {
    if (!solutions.length) {
      return;
    }

    setRandomWord();
  }, [solutions, setRandomWord]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} setRandomWord={setRandomWord} />}
    </div>
  );
}

export default App;
