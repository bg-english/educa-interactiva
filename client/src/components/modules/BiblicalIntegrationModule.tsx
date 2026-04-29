import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content-en';

interface BiblicalIntegrationModuleProps {
  onComplete?: (score: number) => void;
}

export const BiblicalIntegrationModule: React.FC<BiblicalIntegrationModuleProps> = ({ onComplete }) => {
  const [currentView, setCurrentView] = useState<'menu' | 'info' | 'quiz'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const { biblicalIntegration } = gameContent;
  const quiz = biblicalIntegration.quiz;

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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setCurrentView('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>

          <Card className="p-8 bg-white border-2 border-amber-300 mb-6">
            <h2 className="text-3xl font-bold text-amber-700 mb-4">Biblical Integration: Health and Faith</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <h3 className="text-xl font-bold text-amber-700 mb-2">Core Biblical Principles</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>1 Corinthians 6:19:</strong> "Or do you not know that your body is a temple of the Holy Spirit who is in you, whom you have from God, and that you are not your own?"</p>
                  <p><strong>1 Corinthians 12:26-27:</strong> "If one member suffers, all the members suffer with it; if one member is honored, all the members rejoice with it. Now you are Christ's body, and individually members of it."</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Connecting Nutrition to Faith</h3>
                <p className="text-gray-700 mb-3">
                  A balanced diet is not just about physical health—it's an act of stewardship. When we nourish our bodies properly, we honor God's temple and demonstrate gratitude for the gift of life. This connects to our spiritual growth and our ability to serve others.
                </p>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Proper nutrition gives us energy to serve God and others</li>
                  <li>Mindful eating practices reflect gratitude and discipline</li>
                  <li>Sharing meals builds community and strengthens relationships</li>
                  <li>Caring for our health shows respect for God's creation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">The Nervous System as God's Design</h3>
                <p className="text-gray-700 mb-3">
                  The intricate nervous system reflects God's design for communication and connection. Just as our nervous system connects all parts of our body, we are spiritually connected as members of Christ's body.
                </p>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Neural pathways mirror spiritual connections within the faith community</li>
                  <li>The brain's capacity for thought and emotion reflects our spiritual nature</li>
                  <li>Protecting our mental health is part of caring for God's temple</li>
                  <li>Our nervous system enables us to respond to God's calling</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Compassion for Those Suffering</h3>
                <p className="text-gray-700 mb-3">
                  Eating disorders and CNS diseases cause real suffering. As Christ's body, we are called to:
                </p>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Suffer with those who suffer (Romans 12:15)</li>
                  <li>Provide practical support and encouragement</li>
                  <li>Create safe, non-judgmental communities for healing</li>
                  <li>Recognize the dignity and worth of every person</li>
                  <li>Point others toward professional help and faith-based support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Living Out Our Faith Through Health</h3>
                <p className="text-gray-700">
                  Health is not just personal—it's communal. When we take care of ourselves, we're better able to care for others. When we support those struggling with health challenges, we embody Christ's love and demonstrate the reality of His body working together for healing and wholeness.
                </p>
              </div>
            </div>

            <Button
              onClick={() => setCurrentView('quiz')}
              className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3"
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
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 flex items-center justify-center">
          <Card className="p-8 bg-white border-2 border-amber-300 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-amber-700 mb-4">Quiz Complete!</h2>
              <p className="text-2xl font-bold text-gray-800 mb-6">
                Score: {score} / {quiz.length} ({percentage}%)
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleRestartQuiz}
                  variant="outline"
                  className="w-full border-amber-400 text-amber-700 hover:bg-amber-50"
                >
                  Retake Quiz
                </Button>
                <Button
                  onClick={handleComplete}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold"
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setCurrentView('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>

          <Card className="p-6 bg-white border-2 border-amber-300 mb-6">
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600">
                Question {currentQuestion + 1} of {quiz.length}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-amber-600 rounded-full transition-all"
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
                      : 'bg-gray-50 border-gray-300 hover:border-amber-400'
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
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 disabled:opacity-50"
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-700 mb-2">Biblical Integration</h1>
          <p className="text-lg text-gray-600">Connecting Health, Faith, and Community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-amber-100 to-orange-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-5xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-amber-700 mb-3">Learn</h2>
              <p className="text-gray-700 mb-6">
                Explore how biblical principles guide us toward health, compassion, and community care.
              </p>
              <Button
                onClick={() => setCurrentView('info')}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold"
              >
                Learn More
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-100 to-yellow-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-5xl mb-4">❓</div>
              <h2 className="text-2xl font-bold text-orange-700 mb-3">Quiz</h2>
              <p className="text-gray-700 mb-6">
                Test your understanding of how faith, health, and community care are interconnected.
              </p>
              <Button
                onClick={() => setCurrentView('quiz')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold"
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
