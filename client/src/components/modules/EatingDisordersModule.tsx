import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content-en';

interface EatingDisordersModuleProps {
  onComplete?: (score: number) => void;
}

export const EatingDisordersModule: React.FC<EatingDisordersModuleProps> = ({ onComplete }) => {
  const [currentView, setCurrentView] = useState<'menu' | 'info' | 'quiz'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const { eatingDisorders } = gameContent;
  const quiz = eatingDisorders.quiz;

  const handleAnswerClick = (index: number) => {
    if (!answered) {
      setSelectedAnswer(index);
      setAnswered(true);
      if (index === quiz[currentQuestion].correct) {
        setScore(prev => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setQuizComplete(false);
    setCurrentView('menu');
  };

  const handleComplete = () => {
    const percentage = Math.round((score / quiz.length) * 100);
    if (onComplete) {
      onComplete(percentage);
    }
  };

  if (currentView === 'info') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setCurrentView('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>

          <Card className="p-8 bg-white border-2 border-red-300 mb-6">
            <h2 className="text-3xl font-bold text-red-700 mb-4">Understanding Eating Disorders</h2>
            
            <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-700 mb-2">Biblical Principle</h3>
              <p className="text-sm font-semibold text-red-600 mb-2">{eatingDisorders.biblical.verse}</p>
              <p className="text-gray-700 italic mb-3">"{eatingDisorders.biblical.text}"</p>
              <p className="text-gray-700">{eatingDisorders.biblical.reflection}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">What are Eating Disorders?</h3>
                <p className="text-gray-700">
                  Eating disorders are serious mental health conditions characterized by abnormal eating habits and an intense focus on weight and body shape. They can have severe physical and psychological consequences.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Common Types</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Anorexia Nervosa:</strong> Severe food restriction leading to dangerous weight loss and malnutrition.</li>
                  <li><strong>Bulimia Nervosa:</strong> Cycles of binge eating followed by purging through vomiting or laxatives.</li>
                  <li><strong>Binge Eating Disorder:</strong> Recurrent episodes of uncontrolled eating without compensatory behaviors.</li>
                  <li><strong>Orthorexia:</strong> Obsession with eating only "pure" or "healthy" foods.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Health Consequences</h3>
                <p className="text-gray-700">
                  Eating disorders can cause malnutrition, electrolyte imbalances, heart problems, bone loss, organ damage, and in severe cases, death. They also impact mental health, causing depression, anxiety, and social isolation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Recovery and Support</h3>
                <p className="text-gray-700">
                  Recovery from eating disorders requires professional help including therapy, medical care, and nutritional counseling. Support from family, friends, and faith communities is crucial. Remember: your body is God's temple, and you deserve healing and care.
                </p>
              </div>
            </div>

            <Button
              onClick={() => setCurrentView('quiz')}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3"
            >
              Start Quiz →
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (currentView === 'quiz') {
    if (quizComplete) {
      const percentage = Math.round((score / quiz.length) * 100);
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4 flex items-center justify-center">
          <Card className="p-8 bg-white border-2 border-red-300 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-red-700 mb-4">Quiz Complete!</h2>
              <p className="text-2xl font-bold text-gray-800 mb-6">
                Score: {score} / {quiz.length} ({percentage}%)
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleRestartQuiz}
                  variant="outline"
                  className="w-full border-red-400 text-red-700 hover:bg-red-50"
                >
                  Retake Quiz
                </Button>
                <Button
                  onClick={handleComplete}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  Complete Module →
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setCurrentView('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>

          <Card className="p-6 bg-white border-2 border-red-300 mb-6">
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600">
                Question {currentQuestion + 1} of {quiz.length}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-red-600 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {quiz[currentQuestion].question}
            </h3>

            <div className="space-y-3 mb-6">
              {quiz[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={answered}
                  className={`w-full p-4 text-left rounded-lg border-2 transition ${
                    selectedAnswer === index
                      ? index === quiz[currentQuestion].correct
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : answered && index === quiz[currentQuestion].correct
                      ? 'bg-green-100 border-green-500'
                      : 'bg-gray-50 border-gray-300 hover:border-red-400'
                  } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <p className="font-semibold text-gray-800">{option}</p>
                </button>
              ))}
            </div>

            {answered && (
              <Card className={`p-4 mb-6 ${
                selectedAnswer === quiz[currentQuestion].correct
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
              }`}>
                <p className={`font-semibold mb-2 ${
                  selectedAnswer === quiz[currentQuestion].correct
                    ? 'text-green-700'
                    : 'text-red-700'
                }`}>
                  {selectedAnswer === quiz[currentQuestion].correct ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-sm text-gray-700">{quiz[currentQuestion].explanation}</p>
              </Card>
            )}

            <Button
              onClick={handleNextQuestion}
              disabled={!answered}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 disabled:opacity-50"
            >
              {currentQuestion === quiz.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-2">Eating Disorders</h1>
          <p className="text-lg text-gray-600">Understanding the impact on our temple</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-red-100 to-pink-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-red-700 mb-3">Learn</h2>
              <p className="text-gray-700 mb-6">
                Understand eating disorders, their causes, consequences, and the biblical perspective on caring for our bodies.
              </p>
              <Button
                onClick={() => setCurrentView('info')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                Learn More
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-100 to-rose-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-5xl mb-4">❓</div>
              <h2 className="text-2xl font-bold text-pink-700 mb-3">Quiz</h2>
              <p className="text-gray-700 mb-6">
                Test your knowledge about eating disorders and how biblical principles guide us toward health and healing.
              </p>
              <Button
                onClick={() => setCurrentView('quiz')}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold"
              >
                Start Quiz
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
