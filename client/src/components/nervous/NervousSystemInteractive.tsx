import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content';

interface NervousSystemInteractiveProps {
  onComplete?: (score: number) => void;
}

interface PartInfo {
  id: string;
  name: string;
  function: string;
  x: number;
  y: number;
  radius: number;
}

export const NervousSystemInteractive: React.FC<NervousSystemInteractiveProps> = ({ onComplete }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [completedParts, setCompletedParts] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const parts: PartInfo[] = [
    {
      id: 'cerebrum',
      name: 'Cerebro (Cerebrum)',
      function: 'Centro de control del cuerpo. Responsable del pensamiento, memoria, emociones, lenguaje y movimiento voluntario.',
      x: 50,
      y: 20,
      radius: 12,
    },
    {
      id: 'cerebellum',
      name: 'Cerebelo (Cerebellum)',
      function: 'Coordina el movimiento, el equilibrio y la postura. Ayuda a refinar los movimientos voluntarios.',
      x: 45,
      y: 35,
      radius: 8,
    },
    {
      id: 'brainstem',
      name: 'Tronco Encefálico (Brainstem)',
      function: 'Conecta el cerebro con la médula espinal. Controla funciones vitales automáticas como la respiración y el ritmo cardíaco.',
      x: 50,
      y: 42,
      radius: 6,
    },
    {
      id: 'spinalcord',
      name: 'Médula Espinal (Spinal Cord)',
      function: 'Transmite señales entre el cerebro y el resto del cuerpo. Coordina reflejos automáticos para protegerte.',
      x: 50,
      y: 60,
      radius: 5,
    },
    {
      id: 'nerves',
      name: 'Nervios Periféricos',
      function: 'Conectan el sistema nervioso central con todo el cuerpo. Transmiten información sensorial y motora.',
      x: 30,
      y: 55,
      radius: 8,
    },
  ];

  const currentPart = parts.find(p => p.id === selectedPart);

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId);
    setShowInfo(true);

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

  const progress = (completedParts.size / parts.length) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Nervous System Image */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white border-2 border-blue-300">
            <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">
              Haz clic en las partes del sistema nervioso
            </h3>

            <div className="relative w-full max-w-md mx-auto">
              {/* SVG Overlay for clickable areas */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                style={{ cursor: 'pointer' }}
              >
                {/* Cerebrum */}
                <circle
                  cx="50"
                  cy="20"
                  r="12"
                  fill="rgba(255, 107, 107, 0.1)"
                  stroke="rgba(255, 107, 107, 0.5)"
                  strokeWidth="0.5"
                  onClick={() => handlePartClick('cerebrum')}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  className="hover:fill-opacity-30"
                />

                {/* Cerebellum */}
                <circle
                  cx="45"
                  cy="35"
                  r="8"
                  fill="rgba(107, 114, 255, 0.1)"
                  stroke="rgba(107, 114, 255, 0.5)"
                  strokeWidth="0.5"
                  onClick={() => handlePartClick('cerebellum')}
                  className="hover:fill-opacity-30"
                  style={{ cursor: 'pointer' }}
                />

                {/* Brainstem */}
                <circle
                  cx="50"
                  cy="42"
                  r="6"
                  fill="rgba(255, 193, 7, 0.1)"
                  stroke="rgba(255, 193, 7, 0.5)"
                  strokeWidth="0.5"
                  onClick={() => handlePartClick('brainstem')}
                  className="hover:fill-opacity-30"
                  style={{ cursor: 'pointer' }}
                />

                {/* Spinal Cord */}
                <circle
                  cx="50"
                  cy="60"
                  r="5"
                  fill="rgba(76, 175, 80, 0.1)"
                  stroke="rgba(76, 175, 80, 0.5)"
                  strokeWidth="0.5"
                  onClick={() => handlePartClick('spinalcord')}
                  className="hover:fill-opacity-30"
                  style={{ cursor: 'pointer' }}
                />

                {/* Nerves */}
                <circle
                  cx="30"
                  cy="55"
                  r="8"
                  fill="rgba(156, 39, 176, 0.1)"
                  stroke="rgba(156, 39, 176, 0.5)"
                  strokeWidth="0.5"
                  onClick={() => handlePartClick('nerves')}
                  className="hover:fill-opacity-30"
                  style={{ cursor: 'pointer' }}
                />
              </svg>

              {/* Nervous System Image */}
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663467192176/ZXdMHiLX2xGPkPtXivQo5m/nervous-system-77gVAtUzxUmCKTnjatBqcN.webp"
                alt="Sistema Nervioso Central"
                className="w-full h-auto"
              />
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Partes exploradas: {completedParts.size} / {parts.length}
              </p>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Information Panel */}
        <div>
          <Card className="p-4 bg-white border-2 border-blue-300 sticky top-4">
            <h3 className="text-lg font-bold text-blue-700 mb-3">Información</h3>

            {showInfo && currentPart ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{currentPart.name}</h4>
                  <div className="w-2 h-2 bg-blue-500 rounded-full mb-2"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentPart.function}
                  </p>
                </div>

                {completedParts.has(currentPart.id) && (
                  <div className="p-3 bg-green-100 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm font-semibold text-green-700">
                      ✓ Parte explorada
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    Haz clic en diferentes partes de la imagen para aprender más.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 text-sm">
                  Haz clic en una parte del sistema nervioso para ver información
                </p>
                <div className="mt-4 text-4xl">👆</div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Parts List */}
      <Card className="p-6 bg-white border-2 border-gray-300 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Partes del Sistema Nervioso Central</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {parts.map(part => (
            <button
              key={part.id}
              onClick={() => handlePartClick(part.id)}
              className={`p-3 rounded-lg border-2 transition transform hover:scale-105 ${
                completedParts.has(part.id)
                  ? 'bg-green-100 border-green-500 text-green-700 font-bold'
                  : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-sm font-semibold">{part.name.split('(')[0].trim()}</div>
              {completedParts.has(part.id) && (
                <div className="text-lg mt-1">✓</div>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Score and Complete Button */}
      <div className="flex gap-3 justify-center mt-6 flex-wrap">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-800">
            Puntuación: {score} / 100
          </p>
        </div>
        {completedParts.size === parts.length && (
          <Button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            Completar Actividad →
          </Button>
        )}
      </div>
    </div>
  );
};
