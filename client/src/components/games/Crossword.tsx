import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content-en';

interface CrosswordProps {
  onComplete?: (score: number) => void;
}

interface CrosswordCell {
  letter: string;
  number?: number;
  isBlack: boolean;
}

export const Crossword: React.FC<CrosswordProps> = ({ onComplete }) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const crosswordData = gameContent.wordGames.crossword;
  const allClues = [
    ...crosswordData.clues.horizontal,
    ...crosswordData.clues.vertical,
  ];

  const handleInputChange = (clueId: string, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [clueId]: value.toUpperCase(),
    }));
  };

  const handleCheck = () => {
    let correctCount = 0;
    const answers: Record<string, boolean> = {};

    allClues.forEach(clue => {
      const userAnswer = userAnswers[`${clue.number}-${clue.answer}`] || '';
      const isCorrect = userAnswer === clue.answer;
      answers[`${clue.number}-${clue.answer}`] = isCorrect;
      if (isCorrect) correctCount++;
    });

    const percentage = Math.round((correctCount / allClues.length) * 100);
    setScore(percentage);
    setShowResults(true);
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(score);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">Crossword</h2>
          <p className="text-gray-600">Complete the crossword with words related to nutrition</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          {/* Horizontal Clues */}
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-4">Across</h3>
            <div className="space-y-4">
              {crosswordData.clues.horizontal.map(clue => (
                <div key={`h-${clue.number}`} className="bg-white p-4 rounded-lg border border-purple-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {clue.number}. {clue.clue}
                  </label>
                  <input
                    type="text"
                    value={userAnswers[`${clue.number}-${clue.answer}`] || ''}
                    onChange={(e) =>
                      handleInputChange(`${clue.number}-${clue.answer}`, e.target.value)
                    }
                    placeholder={`${clue.length} letters`}
                    maxLength={clue.length}
                    disabled={showResults}
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                  />
                  {showResults && (
                    <p
                      className={`text-sm mt-2 font-semibold ${
                        userAnswers[`${clue.number}-${clue.answer}`] === clue.answer
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {userAnswers[`${clue.number}-${clue.answer}`] === clue.answer
                        ? '✓ Correct'
                        : `✗ Answer: ${clue.answer}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Clues */}
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-4">Down</h3>
            <div className="space-y-4">
              {crosswordData.clues.vertical.map(clue => (
                <div key={`v-${clue.number}`} className="bg-white p-4 rounded-lg border border-purple-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {clue.number}. {clue.clue}
                  </label>
                  <input
                    type="text"
                    value={userAnswers[`${clue.number}-${clue.answer}`] || ''}
                    onChange={(e) =>
                      handleInputChange(`${clue.number}-${clue.answer}`, e.target.value)
                    }
                    placeholder={`${clue.length} letters`}
                    maxLength={clue.length}
                    disabled={showResults}
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                  />
                  {showResults && (
                    <p
                      className={`text-sm mt-2 font-semibold ${
                        userAnswers[`${clue.number}-${clue.answer}`] === clue.answer
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {userAnswers[`${clue.number}-${clue.answer}`] === clue.answer
                        ? '✓ Correct'
                        : `✗ Answer: ${clue.answer}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Score Display */}
        {showResults && (
          <div className="mb-6 p-4 bg-white rounded-lg border-2 border-purple-300">
            <p className="text-center text-lg font-bold text-purple-700">
              Score: {score}%
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center flex-wrap">
          {!showResults ? (
            <Button
              onClick={handleCheck}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
            >
              Check Answers
            </Button>
          ) : (
            <>
              <Button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                Complete Crossword
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-purple-500 text-purple-700 hover:bg-purple-50"
              >
                Try Again
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
