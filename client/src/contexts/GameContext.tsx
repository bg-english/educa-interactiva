import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameState {
  currentGame: string | null;
  gameState: 'playing' | 'won' | 'lost' | 'idle';
  attempts: number;
  score: number;
}

interface GameContextType {
  gameState: GameState;
  setCurrentGame: (game: string | null) => void;
  setGameState: (state: 'playing' | 'won' | 'lost' | 'idle') => void;
  setAttempts: (attempts: number) => void;
  setScore: (score: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameStateInternal] = useState<GameState>({
    currentGame: null,
    gameState: 'idle',
    attempts: 0,
    score: 0,
  });

  const setCurrentGame = (game: string | null) => {
    setGameStateInternal(prev => ({ ...prev, currentGame: game }));
  };

  const setGameState = (state: 'playing' | 'won' | 'lost' | 'idle') => {
    setGameStateInternal(prev => ({ ...prev, gameState: state }));
  };

  const setAttempts = (attempts: number) => {
    setGameStateInternal(prev => ({ ...prev, attempts }));
  };

  const setScore = (score: number) => {
    setGameStateInternal(prev => ({ ...prev, score }));
  };

  const resetGame = () => {
    setGameStateInternal({
      currentGame: null,
      gameState: 'idle',
      attempts: 0,
      score: 0,
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setCurrentGame,
        setGameState,
        setAttempts,
        setScore,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
