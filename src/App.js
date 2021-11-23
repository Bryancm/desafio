import { useState } from "react";
import "./App.css";

function App() {
  const [maxValue, setMaxValue] = useState(0);
  const [word, setWord] = useState("");

  const onChangeWord = (e) => {
    const newWord = e.target.value.toUpperCase();
    setWord(newWord);
    calculateMaxValue(newWord);
  };

  const calculateMaxValue = (word) => {
    let newMaxValue = 0;
    let limit = 26;
    let charCount = {};
    let counts = [];
    const chars = word.split("");

    // obtener los caracteres que se repiten y cuantas veces se repite cada uno
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      let count = 0;
      for (let k = 0; k < chars.length; k++) {
        const secondChar = chars[k];
        if (secondChar === char) count++;
      }
      charCount[char] = count;
    }

    // Pasar las veces que se repiten los caracteres a un array y ordernarlo
    for (const char in charCount) {
      const count = charCount[char];
      counts.push(count);
    }
    counts.sort((a, b) => b - a);

    // obtener el valor maximo tomando en cuenta el valor limite se reduce por cada caracter diferente
    for (const c of counts) {
      newMaxValue = newMaxValue + c * limit;
      limit--;
    }
    setMaxValue(newMaxValue);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>{`${word}`}</h2>
        <input onChange={onChangeWord} value={word} />
        <h2>{`Max Value: ${maxValue}`}</h2>
      </div>
    </div>
  );
}

export default App;
