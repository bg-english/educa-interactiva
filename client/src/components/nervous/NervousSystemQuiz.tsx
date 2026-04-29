import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content';

interface NervousSystemQuizProps {
  onComplete?: (score: number) => void;
}

export const NervousSystemQuiz: React.FC<NervousSystemQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const quiz = gameContent.nervousSystem.quiz;
  const question = quiz[currentQuestion];

  const handleSelectAnswer = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    if (selectedAnswer === question.correct) {
      setScore(prev => prev + 1);
    }
    setAnsweredQuestions(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      const percentage = Math.round((score / quiz.length) * 100);
      onComplete(percentage);
    }
  };

  const isCorrect = selectedAnswer === question.correct;
  const progress = ((currentQuestion + 1) / quiz.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2">Quiz del Sistema Nervioso</h2>
          <p className="text-gray-600">
            Pregunta {currentQuestion + 1} de {quiz.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-6 p-4 bg-white rounded-lg border-2 border-indigo-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg font-semibold transition-all ${
                  selectedAnswer === index
                    ? isCorrect
                      ? 'bg-green-100 border-2 border-green-500 text-green-700'
                      : 'bg-red-100 border-2 border-red-500 text-red-700'
                    : showResult && index === question.correct
                    ? 'bg-green-100 border-2 border-green-500 text-green-700'
                    : 'bg-gray-100 border-2 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                      selectedAnswer === index
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : showResult && index === question.correct
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-white'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {showResult && (
          <div className={`mb-6 p-4 rounded-lg ${
            isCorrect
              ? 'bg-green-100 border-2 border-green-500'
              : 'bg-red-100 border-2 border-red-500'
          }`}>
            <p className={`font-bold mb-2 ${
              isCorrect ? 'text-green-700' : 'text-red-700'
            }`}>
              {isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta Incorrecta'}
            </p>
            <p className="text-sm text-gray-700">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Score */}
        <div className="mb-6 p-4 bg-white rounded-lg border-2 border-indigo-200">
          <p className="text-sm text-gray-600 font-semibold mb-1">Puntuación:</p>
          <p className="text-2xl font-bold text-indigo-700">
            {score} / {answeredQuestions}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Enviar Respuesta
            </Button>
          ) : (
            <>
              {currentQuestion < quiz.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Siguiente Pregunta
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  Finalizar Quiz
                </Button>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
