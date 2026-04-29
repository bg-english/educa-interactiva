import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content';

interface PlateItem {
  id: string;
  name: string;
  color: string;
}

interface BalancedPlateProps {
  onComplete?: (score: number) => void;
}

export const BalancedPlate: React.FC<BalancedPlateProps> = ({ onComplete }) => {
  const foodGroups = gameContent.nutrition.foodGroups;
  const balancedPlateInfo = gameContent.nutrition.balancedPlate;
  const targetPercentages = balancedPlateInfo.percentages;

  const [plateItems, setPlateItems] = useState<Record<string, number>>({
    grains: 0,
    vegetables: 0,
    fruits: 0,
    protein: 0,
    dairy: 0,
  });

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isBalanced, setIsBalanced] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, foodId: string) => {
    setDraggedItem(foodId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, section: string) => {
    e.preventDefault();
    if (draggedItem) {
      setPlateItems(prev => ({
        ...prev,
        [section]: (prev[section as keyof typeof prev] || 0) + 1,
      }));
      setDraggedItem(null);
    }
  };

  const handleRemoveItem = (section: string) => {
    setPlateItems(prev => ({
      ...prev,
      [section]: Math.max(0, (prev[section as keyof typeof prev] || 0) - 1),
    }));
  };

  const calculateBalance = () => {
    const total = Object.values(plateItems).reduce((a, b) => a + b, 0);
    if (total === 0) return null;

    const percentages: Record<string, number> = {};
    Object.entries(plateItems).forEach(([key, value]) => {
      percentages[key] = Math.round((value / total) * 100);
    });

    return percentages;
  };

  const handleCheckBalance = () => {
    const currentPercentages = calculateBalance();
    if (!currentPercentages) {
      alert('Por favor, agrega alimentos al plato');
      return;
    }

    // Check if percentages are within 5% of target
    const tolerance = 5;
    let balanced = true;

    Object.entries(targetPercentages).forEach(([key, target]) => {
      const current = currentPercentages[key] || 0;
      if (Math.abs(current - target) > tolerance) {
        balanced = false;
      }
    });

    setIsBalanced(balanced);
    setScore(balanced ? 100 : 50);
    setShowFeedback(true);
  };

  const handleReset = () => {
    setPlateItems({
      grains: 0,
      vegetables: 0,
      fruits: 0,
      protein: 0,
      dairy: 0,
    });
    setShowFeedback(false);
    setIsBalanced(false);
    setScore(0);
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(score);
    }
  };

  const currentPercentages = calculateBalance();

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-orange-700 mb-2">Plato Balanceado</h2>
          <p className="text-gray-600">
            Arrastra los alimentos al plato para crear una comida balanceada
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Plate Visualization */}
          <div className="lg:col-span-2 flex justify-center items-center">
            <div className="relative w-80 h-80">
              {/* Plate Circle */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
              >
                {/* Plate background */}
                <circle cx="200" cy="200" r="180" fill="#f5f5f5" stroke="#333" strokeWidth="2" />

                {/* Sections */}
                {/* Grains (30%) - Top Left */}
                <path
                  d="M 200 200 L 200 20 A 180 180 0 0 0 72.36 72.36 Z"
                  fill={foodGroups[0].color}
                  opacity="0.7"
                  stroke="#333"
                  strokeWidth="1"
                />

                {/* Vegetables (30%) - Top Right */}
                <path
                  d="M 200 200 L 72.36 72.36 A 180 180 0 0 0 327.64 72.36 Z"
                  fill={foodGroups[1].color}
                  opacity="0.7"
                  stroke="#333"
                  strokeWidth="1"
                />

                {/* Fruits (20%) - Bottom Right */}
                <path
                  d="M 200 200 L 327.64 72.36 A 180 180 0 0 0 380 200 Z"
                  fill={foodGroups[2].color}
                  opacity="0.7"
                  stroke="#333"
                  strokeWidth="1"
                />

                {/* Protein (10%) - Bottom Left */}
                <path
                  d="M 200 200 L 380 200 A 180 180 0 0 0 200 380 Z"
                  fill={foodGroups[3].color}
                  opacity="0.7"
                  stroke="#333"
                  strokeWidth="1"
                />

                {/* Dairy (10%) - Left */}
                <path
                  d="M 200 200 L 200 380 A 180 180 0 0 0 20 200 Z"
                  fill={foodGroups[4].color}
                  opacity="0.7"
                  stroke="#333"
                  strokeWidth="1"
                />

                {/* Labels */}
                <text x="140" y="100" fontSize="14" fontWeight="bold" textAnchor="middle">
                  {plateItems.grains > 0 ? plateItems.grains : 'Granos'}
                </text>
                <text x="260" y="100" fontSize="14" fontWeight="bold" textAnchor="middle">
                  {plateItems.vegetables > 0 ? plateItems.vegetables : 'Verduras'}
                </text>
                <text x="320" y="200" fontSize="14" fontWeight="bold" textAnchor="middle">
                  {plateItems.fruits > 0 ? plateItems.fruits : 'Frutas'}
                </text>
                <text x="260" y="300" fontSize="14" fontWeight="bold" textAnchor="middle">
                  {plateItems.protein > 0 ? plateItems.protein : 'Proteína'}
                </text>
                <text x="100" y="300" fontSize="14" fontWeight="bold" textAnchor="middle">
                  {plateItems.dairy > 0 ? plateItems.dairy : 'Lácteos'}
                </text>
              </svg>

              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'grains')}
                className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm pointer-events-none"
              >
                {Object.values(plateItems).reduce((a, b) => a + b, 0) === 0 && (
                  <p>Arrastra aquí</p>
                )}
              </div>
            </div>
          </div>

          {/* Food Groups Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
              <h3 className="text-lg font-bold text-orange-700 mb-4">Alimentos</h3>
              <div className="space-y-3">
                {foodGroups.map(group => (
                  <div
                    key={group.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, group.id)}
                    className="p-3 rounded-lg cursor-move hover:shadow-md transition-shadow"
                    style={{ backgroundColor: group.color, opacity: 0.8 }}
                  >
                    <p className="font-bold text-white text-sm">{group.name}</p>
                    <p className="text-xs text-white">{group.examples.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Percentages */}
            {currentPercentages && (
              <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                <h3 className="text-lg font-bold text-orange-700 mb-3">Porcentajes</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(currentPercentages).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize font-semibold">{key}:</span>
                      <span>{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Percentages */}
            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-700 mb-3">Objetivo</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(targetPercentages).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize font-semibold">{key}:</span>
                    <span>{value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            isBalanced
              ? 'bg-green-100 border-2 border-green-500'
              : 'bg-yellow-100 border-2 border-yellow-500'
          }`}>
            <p className={`text-lg font-bold ${
              isBalanced ? 'text-green-700' : 'text-yellow-700'
            }`}>
              {isBalanced
                ? '¡Excelente! Tu plato está balanceado 🎉'
                : 'Ajusta las proporciones para balancear el plato'}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            onClick={handleCheckBalance}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
          >
            Verificar Balance
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-orange-500 text-orange-700 hover:bg-orange-50"
          >
            Limpiar Plato
          </Button>
          {showFeedback && (
            <Button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              Finalizar
            </Button>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-blue-700 mb-2">Consejos:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {balancedPlateInfo.tips.map((tip, idx) => (
              <li key={idx}>• {tip}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};
