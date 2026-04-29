import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content';

interface NervousSystemDiagramProps {
  onComplete?: (score: number) => void;
}

export const NervousSystemDiagram: React.FC<NervousSystemDiagramProps> = ({ onComplete }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [completedParts, setCompletedParts] = useState<Set<string>>(new Set());

  const parts = gameContent.nervousSystem.parts;

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId);
    if (!completedParts.has(partId)) {
      setCompletedParts(prev => new Set(Array.from(prev).concat(partId)));
      setScore(prev => prev + Math.round(100 / parts.length));
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(score);
    }
  };

  const selectedPartData = parts.find(p => p.id === selectedPart);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Sistema Nervioso Central</h2>
          <p className="text-gray-600">
            Haz clic en cada parte para aprender sobre sus funciones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Diagram */}
          <div className="lg:col-span-2 flex justify-center items-center bg-white p-6 rounded-lg border-2 border-blue-200">
            <svg
              viewBox="0 0 300 500"
              className="w-full max-w-sm h-auto"
            >
              {/* Brain */}
              <ellipse
                cx="150"
                cy="80"
                rx="60"
                ry="50"
                fill={selectedPart === 'cerebro' ? '#0284C7' : '#06B6D4'}
                opacity={selectedPart === 'cerebro' ? 1 : 0.7}
                stroke="#0369A1"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-100 transition-all"
                onClick={() => handlePartClick('cerebro')}
              />

              {/* Cerebellum */}
              <ellipse
                cx="150"
                cy="130"
                rx="35"
                ry="25"
                fill={selectedPart === 'cerebelo' ? '#0284C7' : '#06B6D4'}
                opacity={selectedPart === 'cerebelo' ? 1 : 0.7}
                stroke="#0369A1"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-100 transition-all"
                onClick={() => handlePartClick('cerebelo')}
              />

              {/* Brain Stem */}
              <rect
                x="130"
                y="155"
                width="40"
                height="40"
                rx="5"
                fill={selectedPart === 'tronco' ? '#0284C7' : '#0891B2'}
                opacity={selectedPart === 'tronco' ? 1 : 0.7}
                stroke="#0369A1"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-100 transition-all"
                onClick={() => handlePartClick('tronco')}
              />

              {/* Spinal Cord */}
              <rect
                x="135"
                y="195"
                width="30"
                height="200"
                rx="5"
                fill={selectedPart === 'medula' ? '#0284C7' : '#06B6D4'}
                opacity={selectedPart === 'medula' ? 1 : 0.7}
                stroke="#0369A1"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-100 transition-all"
                onClick={() => handlePartClick('medula')}
              />

              {/* Peripheral Nerves */}
              <line x1="100" y1="300" x2="50" y2="350" stroke="#06B6D4" strokeWidth="3" />
              <line x1="200" y1="300" x2="250" y2="350" stroke="#06B6D4" strokeWidth="3" />
              <line x1="100" y1="350" x2="50" y2="400" stroke="#06B6D4" strokeWidth="3" />
              <line x1="200" y1="350" x2="250" y2="400" stroke="#06B6D4" strokeWidth="3" />

              {/* Peripheral Nerve Labels */}
              <circle
                cx="50"
                cy="350"
                r="12"
                fill={selectedPart === 'nervios' ? '#0284C7' : '#06B6D4'}
                opacity={selectedPart === 'nervios' ? 1 : 0.7}
                stroke="#0369A1"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-100 transition-all"
                onClick={() => handlePartClick('nervios')}
              />
              <circle
                cx="250"
                cy="350"
                r="12"
                fill={selectedPart === 'nervios' ? '#0284C7' : '#06B6D4'}
                opacity={selectedPart === 'nervios' ? 1 : 0.7}
                stroke="#0369A1"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-100 transition-all"
                onClick={() => handlePartClick('nervios')}
              />

              {/* Labels */}
              <text x="150" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369A1">
                Cerebro
              </text>
              <text x="150" y="155" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369A1">
                Cerebelo
              </text>
              <text x="150" y="180" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369A1">
                Tronco
              </text>
              <text x="150" y="300" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369A1">
                Médula
              </text>
              <text x="20" y="380" fontSize="10" fontWeight="bold" fill="#0369A1">
                Nervios
              </text>
              <text x="260" y="380" fontSize="10" fontWeight="bold" fill="#0369A1">
                Nervios
              </text>
            </svg>
          </div>

          {/* Information Panel */}
          <div className="flex flex-col gap-4">
            {/* Selected Part Info */}
            {selectedPartData ? (
              <Card className="p-4 bg-white border-2 border-blue-300">
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  {selectedPartData.name}
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  {selectedPartData.description}
                </p>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Funciones:</p>
                  <ul className="space-y-1">
                    {selectedPartData.functions.map((func, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        • {func}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ) : (
              <Card className="p-4 bg-gray-50 border-2 border-gray-200">
                <p className="text-center text-gray-600 font-semibold">
                  Haz clic en una parte del sistema nervioso para aprender más
                </p>
              </Card>
            )}

            {/* Progress */}
            <Card className="p-4 bg-white border-2 border-blue-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Progreso:</p>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{
                    width: `${(completedParts.size / parts.length) * 100}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {completedParts.size} / {parts.length} partes exploradas
              </p>
            </Card>

            {/* Score */}
            <Card className="p-4 bg-white border-2 border-green-200">
              <p className="text-sm font-semibold text-gray-700 mb-1">Puntuación:</p>
              <p className="text-3xl font-bold text-green-600">{score}%</p>
            </Card>
          </div>
        </div>

        {/* All Parts List */}
        <div className="mb-6 p-4 bg-white rounded-lg border-2 border-blue-200">
          <h3 className="text-lg font-bold text-blue-700 mb-3">Partes del Sistema Nervioso:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {parts.map(part => (
              <button
                key={part.id}
                onClick={() => handlePartClick(part.id)}
                className={`p-3 rounded-lg font-semibold transition-all ${
                  completedParts.has(part.id)
                    ? 'bg-green-100 text-green-700 border-2 border-green-500'
                    : selectedPart === part.id
                    ? 'bg-blue-200 text-blue-700 border-2 border-blue-500'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {part.name}
                {completedParts.has(part.id) && ' ✓'}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleComplete}
            disabled={completedParts.size === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            Finalizar Diagrama
          </Button>
        </div>
      </Card>
    </div>
  );
};
