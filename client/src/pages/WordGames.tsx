import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Crossword } from '@/components/games/Crossword';
import { WordSearch } from '@/components/games/WordSearch';
import { Hangman } from '@/components/games/Hangman';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';

export default function WordGames() {
  const [currentGame, setCurrentGame] = useState<'menu' | 'crossword' | 'wordsearch' | 'hangman'>('menu');
  const { setModuleScore, addCompletedModule } = useUser();
  const [, setLocation] = useLocation();

  const handleGameComplete = (gameName: string, score: number) => {
    console.log(`${gameName} completed with score: ${score}`);
    setCurrentGame('menu');
  };

  const handleModuleComplete = () => {
    const averageScore = 75;
    setModuleScore('wordGames', averageScore);
    addCompletedModule('wordGames');
    setLocation('/');
  };

  if (currentGame === 'crossword') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-4xl mx-auto mb-4">
          <Button
            onClick={() => setCurrentGame('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>
        </div>
        <Crossword onComplete={(score) => handleGameComplete('crossword', score)} />
      </div>
    );
  }

  if (currentGame === 'wordsearch') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-4xl mx-auto mb-4">
          <Button
            onClick={() => setCurrentGame('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>
        </div>
        <WordSearch onComplete={(score) => handleGameComplete('wordsearch', score)} />
      </div>
    );
  }

  if (currentGame === 'hangman') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-4xl mx-auto mb-4">
          <Button
            onClick={() => setCurrentGame('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>
        </div>
        <Hangman onComplete={(score) => handleGameComplete('hangman', score)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Word Games</h1>
          <p className="text-lg text-gray-600">
            Test your knowledge with these exciting games
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Crossword Card */}
          <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setCurrentGame('crossword')}>
            <div className="text-center">
              <div className="text-5xl mb-4">🔤</div>
              <h2 className="text-2xl font-bold text-purple-700 mb-2">Crossword</h2>
              <p className="text-gray-700 mb-4">
                Complete words related to nutrition using the provided clues.
              </p>
              <Button
                onClick={() => setCurrentGame('crossword')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >
                Play Crossword
              </Button>
            </div>
          </Card>

          {/* Word Search Card */}
          <Card className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setCurrentGame('wordsearch')}>
            <div className="text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Word Search</h2>
              <p className="text-gray-700 mb-4">
                Find all the nervous system words hidden in the grid.
              </p>
              <Button
                onClick={() => setCurrentGame('wordsearch')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                Play Word Search
              </Button>
            </div>
          </Card>

          {/* Hangman Card */}
          <Card className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setCurrentGame('hangman')}>
            <div className="text-center">
              <div className="text-5xl mb-4">🎮</div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Hangman</h2>
              <p className="text-gray-700 mb-4">
                Guess scientific words before the game ends.
              </p>
              <Button
                onClick={() => setCurrentGame('hangman')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                Play Hangman
              </Button>
            </div>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setLocation('/')}
            variant="outline"
            className="border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            ← Back to Home
          </Button>
          <Button
            onClick={handleModuleComplete}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            Complete Module →
          </Button>
        </div>
      </div>
    </div>
  );
}
