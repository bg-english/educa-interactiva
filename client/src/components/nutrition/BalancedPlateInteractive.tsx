import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content';

interface FoodItem {
  id: string;
  name: string;
  group: 'proteins' | 'grains' | 'vegetables' | 'fruits';
  emoji: string;
}

interface BalancedPlateInteractiveProps {
  onComplete?: (score: number) => void;
}

export const BalancedPlateInteractive: React.FC<BalancedPlateInteractiveProps> = ({ onComplete }) => {
  const [draggedItem, setDraggedItem] = useState<FoodItem | null>(null);
  const [placedItems, setPlacedItems] = useState<{ [key: string]: FoodItem[] }>({
    proteins: [],
    grains: [],
    vegetables: [],
    fruits: [],
  });
  const [feedback, setFeedback] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const foodItems: FoodItem[] = [
    { id: '1', name: 'Pollo', group: 'proteins', emoji: '🍗' },
    { id: '2', name: 'Pescado', group: 'proteins', emoji: '🐟' },
    { id: '3', name: 'Huevos', group: 'proteins', emoji: '🥚' },
    { id: '4', name: 'Pan Integral', group: 'grains', emoji: '🍞' },
    { id: '5', name: 'Arroz', group: 'grains', emoji: '🍚' },
    { id: '6', name: 'Pasta', group: 'grains', emoji: '🍝' },
    { id: '7', name: 'Brócoli', group: 'vegetables', emoji: '🥦' },
    { id: '8', name: 'Zanahoria', group: 'vegetables', emoji: '🥕' },
    { id: '9', name: 'Lechuga', group: 'vegetables', emoji: '🥬' },
    { id: '10', name: 'Manzana', group: 'fruits', emoji: '🍎' },
    { id: '11', name: 'Plátano', group: 'fruits', emoji: '🍌' },
    { id: '12', name: 'Fresas', group: 'fruits', emoji: '🍓' },
  ];

  const handleDragStart = (item: FoodItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (group: 'proteins' | 'grains' | 'vegetables' | 'fruits') => {
    if (draggedItem && draggedItem.group === group) {
      setPlacedItems(prev => ({
        ...prev,
        [group]: [...prev[group], draggedItem],
      }));
      setFeedback(`¡Correcto! ${draggedItem.name} va en ${group}`);
      setScore(prev => prev + 1);
    } else if (draggedItem) {
      setFeedback(`❌ ${draggedItem.name} no va en ${group}`);
    }
    setDraggedItem(null);
  };

  const handleRemoveItem = (group: 'proteins' | 'grains' | 'vegetables' | 'fruits', index: number) => {
    setPlacedItems(prev => ({
      ...prev,
      [group]: prev[group].filter((_, i) => i !== index),
    }));
    setScore(prev => Math.max(0, prev - 1));
  };

  const handleCheckPlate = () => {
    const totalItems = Object.values(placedItems).reduce((sum, items) => sum + items.length, 0);
    const isBalanced =
      placedItems.proteins.length > 0 &&
      placedItems.grains.length > 0 &&
      placedItems.vegetables.length > 0 &&
      placedItems.fruits.length > 0;

    if (isBalanced) {
      setFeedback('🎉 ¡Plato Balanceado Correcto! Has distribuido bien los grupos de alimentos.');
      setShowResult(true);
    } else {
      setFeedback('⚠️ Tu plato aún no está balanceado. Necesitas alimentos de todos los grupos.');
    }
  };

  const handleReset = () => {
    setPlacedItems({ proteins: [], grains: [], vegetables: [], fruits: [] });
    setFeedback('');
    setScore(0);
    setShowResult(false);
  };

  const handleComplete = () => {
    if (onComplete) {
      const percentage = Math.round((score / 12) * 100);
      onComplete(percentage);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plate Image */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white border-2 border-orange-300">
            <h3 className="text-2xl font-bold text-orange-700 mb-4 text-center">
              Arrastra los alimentos al plato
            </h3>
            <div className="relative w-full aspect-square max-w-md mx-auto mb-6">
              {/* Plate Image */}
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663467192176/ZXdMHiLX2xGPkPtXivQo5m/balanced-plate-kRrSUbibLVsEjaxTM8WaaH.webp"
                alt="Plato Balanceado"
                className="w-full h-full object-contain"
              />

              {/* Overlay with drop zones */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  {/* Proteins - Top Left */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('proteins')}
                    className="absolute top-0 left-0 w-40 h-40 bg-orange-200 bg-opacity-20 rounded-full border-2 border-dashed border-orange-400 flex flex-wrap items-center justify-center gap-2 p-2 cursor-pointer hover:bg-opacity-30 transition"
                  >
                    <div className="flex flex-wrap gap-1 justify-center">
                      {placedItems.proteins.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleRemoveItem('proteins', idx)}
                          className="bg-orange-300 rounded-full w-8 h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-orange-400 transition"
                          title="Click para remover"
                        >
                          {item.emoji}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grains - Top Right */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('grains')}
                    className="absolute top-0 right-0 w-40 h-40 bg-yellow-200 bg-opacity-20 rounded-full border-2 border-dashed border-yellow-400 flex flex-wrap items-center justify-center gap-2 p-2 cursor-pointer hover:bg-opacity-30 transition"
                  >
                    <div className="flex flex-wrap gap-1 justify-center">
                      {placedItems.grains.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleRemoveItem('grains', idx)}
                          className="bg-yellow-300 rounded-full w-8 h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-yellow-400 transition"
                          title="Click para remover"
                        >
                          {item.emoji}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vegetables - Bottom Left */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('vegetables')}
                    className="absolute bottom-0 left-0 w-40 h-40 bg-green-200 bg-opacity-20 rounded-full border-2 border-dashed border-green-400 flex flex-wrap items-center justify-center gap-2 p-2 cursor-pointer hover:bg-opacity-30 transition"
                  >
                    <div className="flex flex-wrap gap-1 justify-center">
                      {placedItems.vegetables.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleRemoveItem('vegetables', idx)}
                          className="bg-green-300 rounded-full w-8 h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-green-400 transition"
                          title="Click para remover"
                        >
                          {item.emoji}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fruits - Bottom Right */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('fruits')}
                    className="absolute bottom-0 right-0 w-40 h-40 bg-red-200 bg-opacity-20 rounded-full border-2 border-dashed border-red-400 flex flex-wrap items-center justify-center gap-2 p-2 cursor-pointer hover:bg-opacity-30 transition"
                  >
                    <div className="flex flex-wrap gap-1 justify-center">
                      {placedItems.fruits.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleRemoveItem('fruits', idx)}
                          className="bg-red-300 rounded-full w-8 h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-red-400 transition"
                          title="Click para remover"
                        >
                          {item.emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Food Items */}
        <div>
          <Card className="p-4 bg-white border-2 border-gray-300 sticky top-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Alimentos</h3>
            <p className="text-xs text-gray-600 mb-3">Arrastra los alimentos al plato</p>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {foodItems.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  className={`p-3 rounded-lg cursor-move border-2 transition transform hover:scale-105 ${
                    item.group === 'proteins'
                      ? 'bg-orange-100 border-orange-300 hover:bg-orange-200'
                      : item.group === 'grains'
                      ? 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200'
                      : item.group === 'vegetables'
                      ? 'bg-green-100 border-green-300 hover:bg-green-200'
                      : 'bg-red-100 border-red-300 hover:bg-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-semibold text-sm text-gray-800">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <Card className={`p-4 mt-6 border-2 ${
          feedback.includes('Correcto') || feedback.includes('🎉')
            ? 'bg-green-100 border-green-500'
            : 'bg-yellow-100 border-yellow-500'
        }`}>
          <p className={`font-bold ${
            feedback.includes('Correcto') || feedback.includes('🎉')
              ? 'text-green-700'
              : 'text-yellow-700'
          }`}>
            {feedback}
          </p>
        </Card>
      )}

      {/* Score */}
      <div className="mt-6 text-center">
        <p className="text-lg font-bold text-gray-800">
          Puntuación: {score} / 12
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-center mt-6 flex-wrap">
        <Button
          onClick={handleCheckPlate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
        >
          Verificar Plato
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-gray-400 text-gray-700 hover:bg-gray-100"
        >
          Reiniciar
        </Button>
        {showResult && (
          <Button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            Completar Actividad
          </Button>
        )}
      </div>
    </div>
  );
};
