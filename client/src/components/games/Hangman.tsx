import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content';

interface HangmanProps {
  onComplete?: (score: number) => void;
}

const HANGMAN_STAGES = [
  '  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========',
  '  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========',
  '  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========',
  '  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========',
  '  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========',
  '  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========',
  '  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========',
];

export const Hangman: React.FC<HangmanProps> = ({ onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  const hangmanData = gameContent.wordGames.hangman;
  const currentGame = hangmanData[currentWordIndex];
  const word = currentGame.word.toUpperCase();
  const maxWrong = HANGMAN_STAGES.length - 1;
  const wrongGuesses = Array.from(guessedLetters).filter(
    (letter: string) => !word.includes(letter)
  ).length;

  const displayWord = word
    .split('')
    .map((letter: string) => (guessedLetters.has(letter) ? letter : '_'))
    .join(' ');

  const alphabet: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  const availableLetters = alphabet.filter((letter: string) => !guessedLetters.has(letter));

  const isWon =
    word.split('').every((letter: string) => guessedLetters.has(letter)) && !gameOver;
  const isLost = wrongGuesses >= maxWrong;

  useEffect(() => {
    if (isWon) {
      setWon(true);
      setGameOver(true);
      const pointsEarned = Math.max(0, 100 - wrongGuesses * 10);
      setScore(prev => prev + pointsEarned);
      setTotalGames(prev => prev + 1);
    } else if (isLost) {
      setGameOver(true);
      setTotalGames(prev => prev + 1);
    }
  }, [isWon, isLost, wrongGuesses]);

  const handleGuess = (letter: string) => {
    setGuessedLetters(prev => new Set(Array.from(prev).concat(letter)));
  };

  const handleNextWord = () => {
    if (currentWordIndex < hangmanData.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setGuessedLetters(new Set());
      setGameOver(false);
      setWon(false);
    } else {
      if (onComplete) {
        const finalScore = Math.round((score / totalGames) * 100);
        onComplete(finalScore);
      }
    }
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setGuessedLetters(new Set());
    setGameOver(false);
    setWon(false);
    setScore(0);
    setTotalGames(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700 mb-2">Ahorcado</h2>
          <p className="text-gray-600">
            Palabra {currentWordIndex + 1} de {hangmanData.length}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Hangman Drawing */}
          <div className="flex flex-col items-center justify-center">
            <pre className="font-mono text-sm text-gray-700 mb-4">
              {HANGMAN_STAGES[wrongGuesses]}
            </pre>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">
                Errores: {wrongGuesses} / {maxWrong}
              </p>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-300"
                  style={{
                    width: `${(wrongGuesses / maxWrong) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Game Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Pista:</p>
              <p className="text-lg font-semibold text-green-700">
                {currentGame.hint}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Categoría:</p>
              <p className="text-lg font-semibold text-green-700">
                {currentGame.category}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Puntuación:</p>
              <p className="text-2xl font-bold text-green-700">
                {score} / {totalGames > 0 ? totalGames * 100 : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Word Display */}
        <div className="text-center mb-6 p-4 bg-white rounded-lg border-2 border-green-200">
          <p className="text-4xl font-bold text-green-700 tracking-widest font-mono">
            {displayWord}
          </p>
        </div>

        {/* Game Status */}
        {gameOver && (
          <div className={`text-center mb-6 p-4 rounded-lg ${
            won
              ? 'bg-green-100 border-2 border-green-500'
              : 'bg-red-100 border-2 border-red-500'
          }`}>
            <p className={`text-xl font-bold ${
              won ? 'text-green-700' : 'text-red-700'
            }`}>
              {won ? '¡Correcto! 🎉' : `¡Perdiste! La palabra era: ${word}`}
            </p>
          </div>
        )}

        {/* Letter Buttons */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Selecciona letras:</p>
          <div className="grid grid-cols-7 gap-2">
            {availableLetters.map(letter => (
              <Button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={gameOver}
                className="h-10 p-0 text-sm font-bold bg-green-500 hover:bg-green-600 text-white"
              >
                {letter}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          {gameOver && currentWordIndex < hangmanData.length - 1 && (
            <Button
              onClick={handleNextWord}
              className="bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              Siguiente Palabra
            </Button>
          )}
          {gameOver && currentWordIndex === hangmanData.length - 1 && (
            <Button
              onClick={handleNextWord}
              className="bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              Finalizar Ahorcado
            </Button>
          )}
          <Button
            onClick={handleRestart}
            variant="outline"
            className="border-green-500 text-green-700 hover:bg-green-50"
          >
            Reiniciar
          </Button>
        </div>
      </Card>
    </div>
  );
};
