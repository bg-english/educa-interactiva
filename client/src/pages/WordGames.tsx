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
    // Store the score for this game
    console.log(`${gameName} completed with score: ${score}`);
    
    if (gameName === 'hangman') {
      // After hangman, go back to menu
      setCurrentGame('menu');
    } else {
      setCurrentGame('menu');
    }
  };

  const handleModuleComplete = () => {
    // Calculate average score from all games
    const averageScore = 75; // Placeholder
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
            ← Volver al Menú
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
            ← Volver al Menú
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
            ← Volver al Menú
          </Button>
        </div>
        <Hangman onComplete={(score) => handleGameComplete('hangman', score)} />
      </div>
    );
  }

  // Menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Juegos de Palabras</h1>
          <p className="text-lg text-gray-600">
            Pon a prueba tus conocimientos con estos emocionantes juegos
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Crossword Card */}
          <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setCurrentGame('crossword')}>
            <div className="text-center">
              <div className="text-5xl mb-4">🔤</div>
              <h2 className="text-2xl font-bold text-purple-700 mb-2">Crucigrama</h2>
              <p className="text-gray-700 mb-4">
                Completa palabras relacionadas con nutrición usando las pistas proporcionadas.
              </p>
              <Button
                onClick={() => setCurrentGame('crossword')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >
                Jugar Crucigrama
              </Button>
            </div>
          </Card>

          {/* Word Search Card */}
          <Card className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setCurrentGame('wordsearch')}>
            <div className="text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Sopa de Letras</h2>
              <p className="text-gray-700 mb-4">
                Encuentra todas las palabras del sistema nervioso escondidas en la cuadrícula.
              </p>
              <Button
                onClick={() => setCurrentGame('wordsearch')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                Jugar Sopa de Letras
              </Button>
            </div>
          </Card>

          {/* Hangman Card */}
          <Card className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setCurrentGame('hangman')}>
            <div className="text-center">
              <div className="text-5xl mb-4">🎮</div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Ahorcado</h2>
              <p className="text-gray-700 mb-4">
                Adivina palabras científicas antes de que se termine el juego.
              </p>
              <Button
                onClick={() => setCurrentGame('hangman')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                Jugar Ahorcado
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
            ← Volver al Inicio
          </Button>
          <Button
            onClick={handleModuleComplete}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            Completar Módulo →
          </Button>
        </div>
      </div>
    </div>
  );
}
