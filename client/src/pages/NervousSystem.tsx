import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NervousSystemInteractive } from '@/components/nervous/NervousSystemInteractive';
import { NervousSystemQuiz } from '@/components/nervous/NervousSystemQuiz';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';

export default function NervousSystem() {
  const [currentView, setCurrentView] = useState<'menu' | 'diagram' | 'quiz'>('menu');
  const { setModuleScore, addCompletedModule } = useUser();
  const [, setLocation] = useLocation();

  const handleGameComplete = (score: number) => {
    console.log(`Nervous System completed with score: ${score}`);
    setCurrentView('menu');
  };

  const handleModuleComplete = () => {
    const averageScore = 85;
    setModuleScore('nervousSystem', averageScore);
    addCompletedModule('nervousSystem');
    setLocation('/');
  };

  if (currentView === 'diagram') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-6xl mx-auto mb-4">
          <Button
            onClick={() => setCurrentView('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>
        </div>
        <NervousSystemInteractive onComplete={handleGameComplete} />
      </div>
    );
  }

  if (currentView === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-2xl mx-auto mb-4">
          <Button
            onClick={() => setCurrentView('menu')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Menu
          </Button>
        </div>
        <NervousSystemQuiz onComplete={handleGameComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Central Nervous System</h1>
          <p className="text-lg text-gray-600">
            Learn about the parts and functions of the nervous system
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Diagram Card */}
          <Card className="p-8 bg-gradient-to-br from-blue-100 to-cyan-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-6xl mb-4">🧠</div>
              <h2 className="text-2xl font-bold text-blue-700 mb-3">Interactive Diagram</h2>
              <p className="text-gray-700 mb-6">
                Explore the different parts of the central nervous system. Click on each part to learn about its functions and specific characteristics.
              </p>
              <Button
                onClick={() => setCurrentView('diagram')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
              >
                View Diagram
              </Button>
            </div>
          </Card>

          {/* Quiz Card */}
          <Card className="p-8 bg-gradient-to-br from-indigo-100 to-purple-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-6xl mb-4">❓</div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-3">Interactive Quiz</h2>
              <p className="text-gray-700 mb-6">
                Test your knowledge about the central nervous system with multiple-choice questions. Get immediate feedback on your answers.
              </p>
              <Button
                onClick={() => setCurrentView('quiz')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3"
              >
                Take Quiz
              </Button>
            </div>
          </Card>
        </div>

        {/* Educational Content */}
        <Card className="p-8 bg-white border-2 border-blue-200 mb-8">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">What is the Central Nervous System?</h3>
          <p className="text-gray-700 mb-4">
            The central nervous system (CNS) is the most important part of the nervous system. It consists of the brain and spinal cord, and is responsible for processing information and controlling all body functions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-2">🧠 Brain</h4>
              <p className="text-sm text-gray-700">
                Control center of the body. Controls thinking, memory, emotions, and voluntary movement.
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <h4 className="font-bold text-indigo-700 mb-2">⚙️ Spinal Cord</h4>
              <p className="text-sm text-gray-700">
                Transmits signals between the brain and the rest of the body. Also coordinates automatic reflexes to protect you.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-700 mb-2">🔗 Nerves</h4>
              <p className="text-sm text-gray-700">
                Connect the central nervous system with the entire body, allowing communication between the brain and organs.
              </p>
            </div>
          </div>

          <h4 className="font-bold text-gray-800 mb-3">Main Functions:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Receive information:</strong> The CNS receives information from the environment through the senses.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Process information:</strong> Analyzes and processes the information received.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Send responses:</strong> Sends signals to muscles and organs to respond.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Control vital functions:</strong> Regulates breathing, heart rate, and other automatic functions.</span>
            </li>
          </ul>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setLocation('/')}
            variant="outline"
            className="border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            ← Back to Home
          </Button>
          <Button
            onClick={handleModuleComplete}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            Complete Module →
          </Button>
        </div>
      </div>
    </div>
  );
}
