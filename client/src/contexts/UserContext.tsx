import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModuleScore {
  wordGames: number;
  nutrition: number;
  nervousSystem: number;
  finalQuiz: number;
}

interface UserContextType {
  totalScore: number;
  moduleScores: ModuleScore;
  completedModules: string[];
  userAnswers: Record<string, any>;
  setModuleScore: (module: keyof ModuleScore, score: number) => void;
  addCompletedModule: (module: string) => void;
  setUserAnswer: (key: string, answer: any) => void;
  getTotalScore: () => number;
  resetProgress: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [moduleScores, setModuleScores] = useState<ModuleScore>({
    wordGames: 0,
    nutrition: 0,
    nervousSystem: 0,
    finalQuiz: 0,
  });

  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [userAnswers, setUserAnswersState] = useState<Record<string, any>>({});

  const setModuleScore = (module: keyof ModuleScore, score: number) => {
    setModuleScores(prev => ({ ...prev, [module]: score }));
  };

  const addCompletedModule = (module: string) => {
    setCompletedModules(prev => 
      prev.includes(module) ? prev : [...prev, module]
    );
  };

  const setUserAnswer = (key: string, answer: any) => {
    setUserAnswersState(prev => ({ ...prev, [key]: answer }));
  };

  const getTotalScore = () => {
    const scores = Object.values(moduleScores);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const resetProgress = () => {
    setModuleScores({
      wordGames: 0,
      nutrition: 0,
      nervousSystem: 0,
      finalQuiz: 0,
    });
    setCompletedModules([]);
    setUserAnswersState({});
  };

  return (
    <UserContext.Provider
      value={{
        totalScore: getTotalScore(),
        moduleScores,
        completedModules,
        userAnswers,
        setModuleScore,
        addCompletedModule,
        setUserAnswer,
        getTotalScore,
        resetProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
