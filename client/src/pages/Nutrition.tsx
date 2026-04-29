import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BalancedPlateInteractive } from '@/components/nutrition/BalancedPlateInteractive';
import { FoodGroups } from '@/components/nutrition/FoodGroups';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';

export default function Nutrition() {
  const [currentView, setCurrentView] = useState<'menu' | 'plate' | 'groups'>('menu');
  const { setModuleScore, addCompletedModule } = useUser();
  const [, setLocation] = useLocation();

  const handleGameComplete = (score: number) => {
    console.log(`Nutrition completed with score: ${score}`);
    setCurrentView('menu');
  };

  const handleModuleComplete = () => {
    const averageScore = 80;
    setModuleScore('nutrition', averageScore);
    addCompletedModule('nutrition');
    setLocation('/');
  };

  if (currentView === 'plate') {
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
        <BalancedPlateInteractive onComplete={handleGameComplete} />
      </div>
    );
  }

  if (currentView === 'groups') {
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
        <FoodGroups />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Nutrition & Balanced Plate</h1>
          <p className="text-lg text-gray-600">
            Learn to create healthy and balanced meals
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Balanced Plate Card */}
          <Card className="p-8 bg-gradient-to-br from-orange-100 to-red-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <h2 className="text-2xl font-bold text-orange-700 mb-3">Balanced Plate</h2>
              <p className="text-gray-700 mb-6">
                Drag foods to the plate to create a balanced meal. Learn what proportions of each food group you need for optimal nutrition.
              </p>
              <Button
                onClick={() => setCurrentView('plate')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3"
              >
                Play Balanced Plate
              </Button>
            </div>
          </Card>

          {/* Food Groups Card */}
          <Card className="p-8 bg-gradient-to-br from-green-100 to-emerald-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-6xl mb-4">🥗</div>
              <h2 className="text-2xl font-bold text-green-700 mb-3">Food Groups</h2>
              <p className="text-gray-700 mb-6">
                Discover the five main food groups, their health benefits, examples of each group, and recommended daily portions.
              </p>
              <Button
                onClick={() => setCurrentView('groups')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
              >
                View Food Groups
              </Button>
            </div>
          </Card>
        </div>

        {/* Educational Content */}
        <Card className="p-8 bg-white border-2 border-orange-200 mb-8">
          <h3 className="text-2xl font-bold text-orange-700 mb-4">Why is Good Nutrition Important?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">💪 Energy</h4>
              <p className="text-sm text-gray-700">
                Food provides the energy you need to perform your daily activities.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">🧬 Growth</h4>
              <p className="text-sm text-gray-700">
                Proteins and other nutrients are essential for your growth and development.
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-bold text-red-700 mb-2">🛡️ Health</h4>
              <p className="text-sm text-gray-700">
                Good nutrition strengthens your immune system and prevents disease.
              </p>
            </div>
          </div>
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
