import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content-en';

interface CNSDiseasesModuleProps {
  onComplete?: (score: number) => void;
}

export const CNSDiseasesModule: React.FC<CNSDiseasesModuleProps> = ({ onComplete }) => {
  const [currentView, setCurrentView] = useState<'menu' | 'info' | 'quiz'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const { cnsDisorders } = gameContent;
  const quiz = cnsDisorders.quiz;

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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setCurrentView('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>

          <Card className="p-8 bg-white border-2 border-purple-300 mb-6">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">Central Nervous System Diseases</h2>
            
            <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-700 mb-2">Biblical Principle</h3>
              <p className="text-sm font-semibold text-purple-600 mb-2">{cnsDisorders.biblical.verse}</p>
              <p className="text-gray-700 italic mb-3">"{cnsDisorders.biblical.text}"</p>
              <p className="text-gray-700">{cnsDisorders.biblical.reflection}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Understanding CNS Diseases</h3>
                <p className="text-gray-700">
                  Central Nervous System (CNS) diseases affect the brain and spinal cord, impacting movement, cognition, sensation, and vital functions. These conditions require compassion, support, and community care.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Common CNS Diseases</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Alzheimer's Disease:</strong> Progressive memory loss and cognitive decline, primarily affecting older adults.</li>
                  <li><strong>Parkinson's Disease:</strong> Movement disorder causing tremors, rigidity, and difficulty with motor control.</li>
                  <li><strong>Multiple Sclerosis (MS):</strong> Autoimmune disease attacking nerve fiber protective covering, causing weakness and coordination problems.</li>
                  <li><strong>Epilepsy:</strong> Neurological disorder characterized by recurrent seizures due to abnormal brain electrical activity.</li>
                  <li><strong>Stroke:</strong> Sudden interruption of blood flow to the brain, causing rapid neurological damage.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Impact and Support</h3>
                <p className="text-gray-700">
                  CNS diseases affect not only the individual but their entire family and community. As members of Christ's body, we are called to support those suffering, provide practical help, and create inclusive communities that value every person's dignity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Research and Hope</h3>
                <p className="text-gray-700">
                  Ongoing research is advancing treatments and management strategies for CNS diseases. While cures are still being developed, many people live meaningful lives with proper medical care, support systems, and faith communities that embrace them.
                </p>
              </div>
            </div>

            <Button
              onClick={() => setCurrentView('quiz')}
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3"
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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4 flex items-center justify-center">
          <Card className="p-8 bg-white border-2 border-purple-300 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-purple-700 mb-4">Quiz Complete!</h2>
              <p className="text-2xl font-bold text-gray-800 mb-6">
                Score: {score} / {quiz.length} ({percentage}%)
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleRestartQuiz}
                  variant="outline"
                  className="w-full border-purple-400 text-purple-700 hover:bg-purple-50"
                >
                  Retake Quiz
                </Button>
                <Button
                  onClick={handleComplete}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setCurrentView('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>

          <Card className="p-6 bg-white border-2 border-purple-300 mb-6">
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600">
                Question {currentQuestion + 1} of {quiz.length}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-purple-600 rounded-full transition-all"
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
                      : 'bg-gray-50 border-gray-300 hover:border-purple-400'
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
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 disabled:opacity-50"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">CNS Diseases</h1>
          <p className="text-lg text-gray-600">Supporting those who suffer as Christ's body</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-purple-100 to-indigo-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-purple-700 mb-3">Learn</h2>
              <p className="text-gray-700 mb-6">
                Understand common CNS diseases and how we can support those affected with compassion and care.
              </p>
              <Button
                onClick={() => setCurrentView('info')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >
                Learn More
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-indigo-100 to-blue-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-5xl mb-4">❓</div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-3">Quiz</h2>
              <p className="text-gray-700 mb-6">
                Test your knowledge about CNS diseases and biblical principles of compassion and community support.
              </p>
              <Button
                onClick={() => setCurrentView('quiz')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
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
