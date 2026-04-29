import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';
import { gameContent } from '@/lib/content';

export default function Workshop() {
  const { moduleScores, getTotalScore, resetProgress } = useUser();
  const [showResults, setShowResults] = useState(false);
  const [, setLocation] = useLocation();

  const workshopData = gameContent.workshop;
  const totalScore = getTotalScore();
  const passingScore = workshopData.passingScore;

  const getFeedback = () => {
    if (totalScore >= 90) return workshopData.feedback.excellent;
    if (totalScore >= 80) return workshopData.feedback.good;
    if (totalScore >= passingScore) return workshopData.feedback.fair;
    return workshopData.feedback.needsImprovement;
  };

  const getFeedbackColor = () => {
    if (totalScore >= 90) return 'text-green-700';
    if (totalScore >= 80) return 'text-blue-700';
    if (totalScore >= passingScore) return 'text-yellow-700';
    return 'text-red-700';
  };

  const getFeedbackBgColor = () => {
    if (totalScore >= 90) return 'bg-green-100 border-green-500';
    if (totalScore >= 80) return 'bg-blue-100 border-blue-500';
    if (totalScore >= passingScore) return 'bg-yellow-100 border-yellow-500';
    return 'bg-red-100 border-red-500';
  };

  const handleStartWorkshop = () => {
    setShowResults(true);
  };

  const handleRetry = () => {
    resetProgress();
    setShowResults(false);
    setLocation('/');
  };

  const handleHome = () => {
    setLocation('/');
  };

  if (!showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Final Assessment Workshop</h1>
            <p className="text-lg text-gray-600">
              Demonstrate what you have learned in all modules
            </p>
          </div>

          {/* Instructions */}
          <Card className="p-8 bg-white border-2 border-purple-300 mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Instructions</h2>
            <p className="text-gray-700 mb-4">
              This workshop will assess your understanding of all the topics you have studied:
            </p>
            <ul className="space-y-3 mb-6">
              {workshopData.sections.map((section, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-lg">●</span>
                  <div>
                    <p className="font-bold text-gray-800">{section.title} ({section.weight}%)</p>
                    <p className="text-sm text-gray-600">
                      {section.tasks.join(', ')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> You need to score at least <strong>{passingScore}%</strong> to pass the workshop.
              </p>
            </div>

            <Button
              onClick={handleStartWorkshop}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 text-lg"
            >
              Start Assessment
            </Button>
          </Card>

          {/* Tips */}
          <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
            <h3 className="font-bold text-yellow-700 mb-3">💡 Tips for Success:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Read each question or instruction carefully</li>
              <li>✓ Take your time to think about the answers</li>
              <li>✓ Review your work before finishing</li>
              <li>✓ Remember what you learned in each module</li>
            </ul>
          </Card>
        </div>
      </div>
    );
  }

  // Results View
  const passed = totalScore >= passingScore;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Workshop Results</h1>
        </div>

        {/* Score Card */}
        <Card className={`p-8 text-center mb-8 border-4 ${
          passed ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
        }`}>
          <div className="mb-4">
            {passed ? (
              <div className="text-6xl mb-4">🎉</div>
            ) : (
              <div className="text-6xl mb-4">📚</div>
            )}
          </div>

          <p className={`text-6xl font-bold mb-4 ${
            passed ? 'text-green-600' : 'text-red-600'
          }`}>
            {totalScore}%
          </p>

          <p className={`text-2xl font-bold mb-4 ${
            passed ? 'text-green-700' : 'text-red-700'
          }`}>
            {passed ? 'PASSED!' : 'NOT PASSED'}
          </p>

          <p className="text-gray-700 mb-2">
            Required Score: {passingScore}%
          </p>
        </Card>

        {/* Feedback */}
        <Card className={`p-6 mb-8 border-2 ${getFeedbackBgColor()}`}>
          <p className={`text-lg font-bold ${getFeedbackColor()}`}>
            {getFeedback()}
          </p>
        </Card>

        {/* Detailed Scores */}
        <Card className="p-6 mb-8 bg-white border-2 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Score Breakdown</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <span className="font-bold text-gray-800">Word Games</span>
              <span className="text-2xl font-bold text-purple-600">{moduleScores.wordGames}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <span className="font-bold text-gray-800">Nutrition</span>
              <span className="text-2xl font-bold text-orange-600">{moduleScores.nutrition}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <span className="font-bold text-gray-800">Nervous System</span>
              <span className="text-2xl font-bold text-blue-600">{moduleScores.nervousSystem}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <span className="font-bold text-gray-800">Eating Disorders</span>
              <span className="text-2xl font-bold text-red-600">{moduleScores.eatingDisorders}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
              <span className="font-bold text-gray-800">CNS Diseases</span>
              <span className="text-2xl font-bold text-pink-600">{moduleScores.cnsDisorders}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <span className="font-bold text-gray-800">Biblical Integration</span>
              <span className="text-2xl font-bold text-indigo-600">{moduleScores.biblicalIntegration}%</span>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        {!passed && (
          <Card className="p-6 mb-8 bg-yellow-50 border-2 border-yellow-400">
            <h3 className="font-bold text-yellow-700 mb-3">📖 Recommendations:</h3>
            <ul className="space-y-2 text-gray-700">
              {moduleScores.wordGames < passingScore && (
                <li>• Review the word games (Crossword, Word Search, Hangman)</li>
              )}
              {moduleScores.nutrition < passingScore && (
                <li>• Study more about nutrition and the balanced plate</li>
              )}
              {moduleScores.nervousSystem < passingScore && (
                <li>• Review the parts and functions of the central nervous system</li>
              )}
              {moduleScores.eatingDisorders < passingScore && (
                <li>• Study eating disorders and their impact on health</li>
              )}
              {moduleScores.cnsDisorders < passingScore && (
                <li>• Learn more about central nervous system diseases</li>
              )}
              {moduleScores.biblicalIntegration < passingScore && (
                <li>• Review the biblical principles and their connection to health</li>
              )}
            </ul>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={handleHome}
            variant="outline"
            className="border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            ← Back to Home
          </Button>
          <Button
            onClick={handleRetry}
            className={`${
              passed
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-orange-600 hover:bg-orange-700'
            } text-white font-bold`}
          >
            {passed ? 'Explore Again' : 'Try Again'}
          </Button>
          <Button
            onClick={() => setLocation('/results')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            View Certificate →
          </Button>
        </div>

        {/* Certificate */}
        {passed && (
          <Card className="mt-8 p-8 bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-400 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-yellow-800 mb-2">Achievement Certificate!</h3>
            <p className="text-gray-700 mb-4">
              You have successfully completed the Health, Science & Faith educational workshop.
            </p>
            <p className="text-sm text-gray-600">
              Date: {new Date().toLocaleDateString('en-US')}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
