import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import Solution from "./types/Solution";
import Wordle from "./components/Wordle";

import "./assets/css/App.css";

function App() {
  const [solution, setSolution] = useState<string>("");

  const fetchSolution = async () => {
    const response: AxiosResponse<Solution[]> = await axios.get(
      "https://ayxsth.github.io/wordle/data/solutions.json"
    );

    // for local
    // const response: AxiosResponse<Solution[]> = await axios.get(
    //   "http://localhost:3001/solutions"
    // );

    const data = response.data;
    const word = data[~~(Math.random() * data.length)].word;

    setSolution(word);
  };

  useEffect(() => {
    fetchSolution();
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution ? <Wordle solution={solution} /> : <>Loading...</>}
    </div>
  );
}

export default App;
