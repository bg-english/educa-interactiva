import React from 'react';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content';

export const FoodGroups: React.FC = () => {
  const foodGroups = gameContent.nutrition.foodGroups;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Grupos de Alimentos</h2>
        <p className="text-lg text-gray-600">
          Aprende sobre los diferentes grupos de alimentos y sus beneficios
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodGroups.map(group => (
          <Card
            key={group.id}
            className="p-6 hover:shadow-lg transition-shadow"
            style={{
              borderLeft: `6px solid ${group.color}`,
              backgroundColor: `${group.color}15`,
            }}
          >
            {/* Color Circle */}
            <div
              className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
              style={{ backgroundColor: group.color }}
            >
              <span className="text-2xl font-bold text-white">
                {group.name.charAt(0)}
              </span>
            </div>

            {/* Group Name */}
            <h3 className="text-2xl font-bold mb-2" style={{ color: group.color }}>
              {group.name}
            </h3>

            {/* Portion */}
            <div className="mb-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600 font-semibold">Porción Diaria:</p>
              <p className="text-lg font-bold text-gray-800">{group.portion}</p>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 font-semibold mb-2">Beneficios:</p>
              <p className="text-sm text-gray-700">{group.benefits}</p>
            </div>

            {/* Examples */}
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-2">Ejemplos:</p>
              <div className="flex flex-wrap gap-2">
                {group.examples.map(example => (
                  <span
                    key={example}
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: group.color }}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Balanced Plate Info */}
      <Card className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
        <h3 className="text-2xl font-bold text-green-700 mb-4">¿Qué es un Plato Balanceado?</h3>
        <p className="text-gray-700 mb-4">
          Un plato balanceado contiene porciones adecuadas de cada grupo de alimentos para proporcionar
          todos los nutrientes que tu cuerpo necesita. La distribución ideal es:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {Object.entries(gameContent.nutrition.balancedPlate.percentages).map(([key, percentage]) => (
            <div key={key} className="text-center p-4 bg-white rounded-lg border-2 border-green-200">
              <p className="text-3xl font-bold text-green-600">{percentage}%</p>
              <p className="text-sm font-semibold text-gray-700 capitalize">{key}</p>
            </div>
          ))}
        </div>

        <h4 className="font-bold text-gray-800 mb-3">Consejos para un Plato Balanceado:</h4>
        <ul className="space-y-2">
          {gameContent.nutrition.balancedPlate.tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg">✓</span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
