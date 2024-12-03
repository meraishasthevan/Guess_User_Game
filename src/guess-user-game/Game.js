import React, { useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import "./Game.css";

const Game = () => {
    const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1); 
    const [ranges, setRanges] = useState([
      { min: 1, max: 20 },
      { min: 21, max: 40 },
      { min: 41, max: 60 },
      { min: 61, max: 80 },
      { min: 81, max: 100 },
    ]);
    const [numbers, setNumbers] = useState([]); 
    const [feedback, setFeedback] = useState("");
    const [attempts, setAttempts] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
  
    const handleRangeClick = (min, max) => {
      if (attempts === 0 || gameOver) return;
  
      if (targetNumber >= min && targetNumber <= max) {
        setFeedback("🔥 Warm! You're close! Now pick a number.");
        const refinedNumbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
        setNumbers(refinedNumbers); 
      } else {
        setFeedback("❄️ Cold! Try a different range.");
        setAttempts((prev) => prev - 1);
      }
  
      if (attempts === 1 && (targetNumber < min || targetNumber > max)) {
        setFeedback(`😢 Game Over! The number was ${targetNumber}.`);
        setGameOver(true);
      }
    };
  
    const handleNumberClick = (number) => {
      if (number === targetNumber) {
        setFeedback("🎉 Correct! You guessed the number!");
        setGameOver(true);
        setIsCorrect(true);
      } else if (number < targetNumber) {
        setFeedback("📉 Too Low! Try again.");
      } else {
        setFeedback("📈 Too High! Try again.");
      }
  
      setAttempts((prev) => prev - 1);
  
      if (attempts === 1 && number !== targetNumber) {
        setFeedback(`😢 Game Over! The number was ${targetNumber}.`);
        setGameOver(true);
      }
    };
  
    const restartGame = () => {
      window.location.reload(); 
    };
  
    return (
      <div className="game-container">
        {isCorrect && <Confetti />}
        <h1 className="title">Guess the Number</h1>
        <p className="subtitle">Click a range, then pick a number!</p>
  
        <motion.div
          className="feedback"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {feedback && <p>{feedback}</p>}
        </motion.div>
  
        <div className="ranges">
          {numbers.length === 0 &&
            ranges.map((range, index) => (
              <motion.button
                key={index}
                className="range-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRangeClick(range.min, range.max)}
                disabled={gameOver}
              >
                {range.min}-{range.max}
              </motion.button>
            ))}
        </div>
  
        <div className="numbers">
          {numbers.length > 0 &&
            numbers.map((number, index) => (
              <motion.button
                key={index}
                className="number-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNumberClick(number)}
                disabled={gameOver}
              >
                {number}
              </motion.button>
            ))}
        </div>
  
        <p className="attempts">Attempts Left: {attempts}</p>
        {gameOver && (
          <button className="restart-button" onClick={restartGame}>
            Restart Game
          </button>
        )}
      </div>
    );
};

export default Game;
