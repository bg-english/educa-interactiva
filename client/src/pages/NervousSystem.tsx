import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NervousSystemDiagram } from '@/components/nervous/NervousSystemDiagram';
import { NervousSystemQuiz } from '@/components/nervous/NervousSystemQuiz';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';

export default function NervousSystem() {
  const [currentView, setCurrentView] = useState<'menu' | 'diagram' | 'quiz'>('menu');
  const { setModuleScore, addCompletedModule } = useUser();
  const [, setLocation] = useLocation();

  const handleGameComplete = (score: number) => {
    console.log(`Sistema Nervioso completed with score: ${score}`);
    setCurrentView('menu');
  };

  const handleModuleComplete = () => {
    const averageScore = 85; // Placeholder
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
            ← Volver al Menú
          </Button>
        </div>
        <NervousSystemDiagram onComplete={handleGameComplete} />
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
            ← Volver al Menú
          </Button>
        </div>
        <NervousSystemQuiz onComplete={handleGameComplete} />
      </div>
    );
  }

  // Menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sistema Nervioso Central</h1>
          <p className="text-lg text-gray-600">
            Aprende sobre las partes y funciones del sistema nervioso
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Diagram Card */}
          <Card className="p-8 bg-gradient-to-br from-blue-100 to-cyan-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-6xl mb-4">🧠</div>
              <h2 className="text-2xl font-bold text-blue-700 mb-3">Diagrama Interactivo</h2>
              <p className="text-gray-700 mb-6">
                Explora las diferentes partes del sistema nervioso central. Haz clic en cada parte
                para aprender sobre sus funciones y características específicas.
              </p>
              <Button
                onClick={() => setCurrentView('diagram')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
              >
                Ver Diagrama
              </Button>
            </div>
          </Card>

          {/* Quiz Card */}
          <Card className="p-8 bg-gradient-to-br from-indigo-100 to-purple-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-6xl mb-4">❓</div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-3">Quiz Interactivo</h2>
              <p className="text-gray-700 mb-6">
                Pon a prueba tus conocimientos sobre el sistema nervioso central con preguntas
                de opción múltiple. Obtén retroalimentación inmediata sobre tus respuestas.
              </p>
              <Button
                onClick={() => setCurrentView('quiz')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3"
              >
                Hacer Quiz
              </Button>
            </div>
          </Card>
        </div>

        {/* Educational Content */}
        <Card className="p-8 bg-white border-2 border-blue-200 mb-8">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">¿Qué es el Sistema Nervioso Central?</h3>
          <p className="text-gray-700 mb-4">
            El sistema nervioso central (SNC) es la parte más importante del sistema nervioso. Está
            compuesto por el cerebro y la médula espinal, y es responsable de procesar información
            y controlar todas las funciones del cuerpo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-2">🧠 Cerebro</h4>
              <p className="text-sm text-gray-700">
                Centro de control del cuerpo. Controla el pensamiento, la memoria, las emociones
                y el movimiento voluntario.
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <h4 className="font-bold text-indigo-700 mb-2">⚙️ Médula Espinal</h4>
              <p className="text-sm text-gray-700">
                Transmite señales entre el cerebro y el resto del cuerpo. También coordina reflejos
                automáticos para protegerte.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-700 mb-2">🔗 Nervios</h4>
              <p className="text-sm text-gray-700">
                Conectan el sistema nervioso central con todo el cuerpo, permitiendo la comunicación
                entre el cerebro y los órganos.
              </p>
            </div>
          </div>

          <h4 className="font-bold text-gray-800 mb-3">Funciones Principales:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Recibir información:</strong> El SNC recibe información del ambiente a través de los sentidos.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Procesar información:</strong> Analiza y procesa la información recibida.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Enviar respuestas:</strong> Envía señales a los músculos y órganos para responder.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>Controlar funciones vitales:</strong> Regula la respiración, el ritmo cardíaco y otras funciones automáticas.</span>
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
            ← Volver al Inicio
          </Button>
          <Button
            onClick={handleModuleComplete}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            Completar Módulo →
          </Button>
        </div>
      </div>
    </div>
  );
}
