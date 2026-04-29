import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';

export default function Home() {
  const { getTotalScore, completedModules, moduleScores } = useUser();
  const [, setLocation] = useLocation();
  const totalScore = getTotalScore();

  const modules = [
    {
      id: 'wordGames',
      title: 'Word Games',
      description: 'Crossword, Word Search & Hangman',
      icon: '🎮',
      color: 'from-green-100 to-emerald-100',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      route: '/word-games',
      score: moduleScores.wordGames,
    },
    {
      id: 'nutrition',
      title: 'Nutrition',
      description: 'Balanced Plate & Food Groups',
      icon: '🍽️',
      color: 'from-orange-100 to-yellow-100',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-700',
      route: '/nutrition',
      score: moduleScores.nutrition,
    },
    {
      id: 'nervousSystem',
      title: 'Nervous System',
      description: 'Interactive Diagram & Quiz',
      icon: '🧠',
      color: 'from-blue-100 to-cyan-100',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      route: '/nervous-system',
      score: moduleScores.nervousSystem,
    },
    {
      id: 'eatingDisorders',
      title: 'Eating Disorders',
      description: 'Understanding Health & Faith',
      icon: '🚫',
      color: 'from-red-100 to-pink-100',
      borderColor: 'border-red-500',
      textColor: 'text-red-700',
      route: '/eating-disorders',
      score: moduleScores.eatingDisorders,
    },
    {
      id: 'cnsDisorders',
      title: 'CNS Diseases',
      description: 'Compassion & Community Care',
      icon: '🏥',
      color: 'from-purple-100 to-indigo-100',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-700',
      route: '/cns-disorders',
      score: moduleScores.cnsDisorders,
    },
    {
      id: 'biblicalIntegration',
      title: 'Biblical Integration',
      description: 'Health, Faith & Community',
      icon: '📖',
      color: 'from-amber-100 to-orange-100',
      borderColor: 'border-amber-500',
      textColor: 'text-amber-700',
      route: '/biblical-integration',
      score: moduleScores.biblicalIntegration,
    },
  ];

  const handleModuleClick = (route: string) => {
    setLocation(route);
  };

  const handleWorkshop = () => {
    setLocation('/workshop');
  };

  const handleResults = () => {
    setLocation('/results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold">EducaInteractiva</h1>
              <p className="text-blue-100 text-lg">Health, Science & Faith Workshop</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Total Score</p>
              <p className="text-5xl font-bold">{totalScore}%</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <Card className="p-8 bg-white border-2 border-blue-300 mb-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Workshop</h2>
          <p className="text-lg text-gray-700 mb-4">
            This is an interactive space where you'll learn about health, nutrition, the nervous system, and biblical principles of caring for our bodies. Each module is designed to help you understand important concepts through games, simulations, and educational activities.
          </p>
          <p className="text-lg text-gray-700">
            Complete all modules and take the final workshop assessment to demonstrate what you've learned. Remember: "Your body is a temple of the Holy Spirit" (1 Corinthians 6:19).
          </p>
        </Card>

        {/* Modules Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Available Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card
                key={module.id}
                className={`p-6 bg-gradient-to-br ${module.color} border-2 ${module.borderColor} hover:shadow-lg transition-shadow cursor-pointer`}
                onClick={() => handleModuleClick(module.route)}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">{module.icon}</div>
                  <h3 className={`text-2xl font-bold ${module.textColor} mb-2`}>{module.title}</h3>
                  <p className="text-gray-700 mb-4">{module.description}</p>
                  {module.score > 0 && (
                    <div className="mb-4 p-2 bg-white rounded-lg">
                      <p className="text-sm font-semibold text-gray-600">Score: {module.score}%</p>
                    </div>
                  )}
                  <Button
                    onClick={() => handleModuleClick(module.route)}
                    className={`w-full ${module.textColor.replace('text-', 'bg-').replace('-700', '-600')} hover:opacity-90 text-white font-bold`}
                  >
                    Access Module →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <Card className="p-8 bg-white border-2 border-gray-300 mb-12 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h2>
          <div className="space-y-3">
            {modules.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">{module.title}</span>
                <span className={`font-bold ${module.score > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {module.score > 0 ? `${module.score}%` : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="p-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-2xl font-bold mb-3">Final Workshop</h3>
              <p className="mb-6">
                Ready for the comprehensive assessment? Complete all modules first to unlock the final workshop.
              </p>
              <Button
                onClick={handleWorkshop}
                disabled={completedModules.length < modules.length}
                className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 disabled:opacity-50"
              >
                Start Final Assessment →
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-green-500 to-emerald-500 text-white hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-3">View Results</h3>
              <p className="mb-6">
                See your certificate, download your PDF, and share your achievement on Telegram.
              </p>
              <Button
                onClick={handleResults}
                className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-3"
              >
                View Certificate →
              </Button>
            </div>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="p-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300">
          <h2 className="text-2xl font-bold text-amber-700 mb-6">💡 Tips for Better Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-3xl">📚</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Take Your Time</h4>
                <p className="text-gray-700">There's no rush. Learn at your own pace and understand each concept thoroughly.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Be Consistent</h4>
                <p className="text-gray-700">Practice regularly for better results and deeper understanding.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🔄</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Repeat Modules</h4>
                <p className="text-gray-700">You can complete modules multiple times to improve your scores.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🏆</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Celebrate Progress</h4>
                <p className="text-gray-700">Every step is progress toward success and personal growth.</p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 px-4 mt-12 text-center">
        <p>© 2026 EducaInteractiva. All rights reserved. | "Your body is a temple of the Holy Spirit" - 1 Corinthians 6:19</p>
      </footer>
    </div>
  );
}
