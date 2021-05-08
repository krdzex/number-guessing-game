import React, { useState } from "react";
import './App.css';
const min = 1;
const max = 100;
const randomNumber = Math.floor(min + Math.random() * (max - min));
var tryingNumber = 0;
const App = () => {

  const [historyOfTries] = useState([]);
  const onChangeInput = () => {
    tryingNumber = parseInt(document.getElementById("input").value);
  }
  const [isCorrect, setIsCorrect] = useState();
  const [noOfAtt, setNoOfAtt] = useState(10);

  const submitButton = () => {
    if (tryingNumber !== 0 && tryingNumber >= 1 && tryingNumber <= 100) {
      if (tryingNumber === randomNumber) {
        setIsCorrect(true);
        return true;
      } else if (noOfAtt > 0) {
        setIsCorrect(false);
        historyOfTries.push(tryingNumber);
        setNoOfAtt(noOfAtt - 1)
        return false;
      }
    }
  }

  function refreshGame() {
    window.location.reload(false);
  }

  const clear = () => {
    document.getElementById("input").value = "";
    tryingNumber = 0;
  }

  return (
    <div className="app-wrapper">
      <div className="input-container">
        <p>Enter a number:</p>
        <input disabled={isCorrect || noOfAtt === 0} onChange={onChangeInput} id="input" type="number" min="1" max="100"></input>
      </div>
      <div className="button-part">
        <button disabled={isCorrect || noOfAtt === 0} onClick={submitButton}>Submit number</button>
        <button disabled={isCorrect || noOfAtt === 0} onClick={clear}>Clear</button>
        <button disabled={isCorrect || noOfAtt === 0} onClick={refreshGame}>Reset</button>
      </div>
      <hr style={{ color: "grey", width: "350px" }} />

      <div className="attempts">
        <p>Remaining attempts: {noOfAtt}</p>
      </div>
      <div className="guesses">
        <p>Previous guesses: {historyOfTries.toString()}</p>
      </div>
      <div className="results">
        <div className="bg-success" style={isCorrect === true ? { visibility: "visible" } : { visibility: "hidden " }}>
          <p>Congratulations! You got it right!</p>
        </div>
        <div className="bg-info" style={isCorrect === false && randomNumber > tryingNumber && noOfAtt !== 0 ? { visibility: "visible" } : { visibility: "hidden " }}>
          <p>UPS! Last guess was too low!</p>
        </div>
        <div className="bg-danger" style={isCorrect === false && randomNumber < tryingNumber && noOfAtt !== 0 ? { visibility: "visible" } : { visibility: "hidden " }}>
          <p>UPS! Last quess was too high!</p>
        </div>
        <div className="bg-warning" style={isCorrect === false && noOfAtt === 0 ? { visibility: "visible" } : { visibility: "hidden " }}>
          <p>GAME OVER!</p>
        </div>
      </div >
      <div className="newGame" style={isCorrect === true || noOfAtt === 0 ? { visibility: "visible" } : { visibility: "hidden " }}>
        <button onClick={refreshGame}>Start new game</button>
      </div>
    </div >

  );
}
export default App;
