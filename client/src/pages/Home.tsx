import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';

export default function Home() {
  const { getTotalScore, completedModules } = useUser();
  const [, setLocation] = useLocation();
  const totalScore = getTotalScore();

  const modules = [
    {
      id: 'wordGames',
      title: 'Juegos de Palabras',
      description: 'Crucigrama, Sopa de Letras y Ahorcado',
      icon: '🎮',
      color: 'from-green-100 to-emerald-100',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      route: '/word-games',
    },
    {
      id: 'nutrition',
      title: 'Nutrición',
      description: 'Plato Balanceado y Grupos de Alimentos',
      icon: '🍽️',
      color: 'from-orange-100 to-red-100',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-700',
      route: '/nutrition',
    },
    {
      id: 'nervousSystem',
      title: 'Sistema Nervioso',
      description: 'Diagrama Interactivo y Quiz',
      icon: '🧠',
      color: 'from-blue-100 to-indigo-100',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      route: '/nervous-system',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">EducaInteractiva</h1>
              <p className="text-blue-100 text-lg">
                Workshop Educativo de Ciencias y Nutrición
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100 mb-1">Puntuación Total</p>
              <p className="text-4xl font-bold">{totalScore}%</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <Card className="p-8 bg-white border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido al Workshop</h2>
            <p className="text-gray-700 mb-4">
              Este es un espacio interactivo donde puedes aprender sobre ciencias y nutrición a través
              de juegos, simuladores y actividades educativas. Cada módulo está diseñado para ayudarte
              a comprender conceptos importantes de manera divertida y práctica.
            </p>
            <p className="text-gray-700">
              Completa todos los módulos y realiza el workshop final de evaluación para demostrar
              lo que has aprendido. ¡Buena suerte!
            </p>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Módulos Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map(module => (
              <Card
                key={module.id}
                className={`p-6 bg-gradient-to-br ${module.color} border-2 ${module.borderColor} hover:shadow-lg transition-shadow cursor-pointer`}
                onClick={() => setLocation(module.route)}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">{module.icon}</div>
                  <h3 className={`text-2xl font-bold ${module.textColor} mb-2`}>
                    {module.title}
                  </h3>
                  <p className="text-gray-700 mb-4 text-sm">
                    {module.description}
                  </p>

                  {/* Completion Status */}
                  <div className="mb-4">
                    {completedModules.includes(module.id) ? (
                      <div className="inline-block px-3 py-1 bg-green-200 text-green-700 rounded-full text-sm font-bold">
                        ✓ Completado
                      </div>
                    ) : (
                      <div className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-bold">
                        Por Completar
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => setLocation(module.route)}
                    className={`w-full ${module.textColor} bg-white border-2 ${module.borderColor} hover:bg-gray-50 font-bold`}
                  >
                    Acceder →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Tu Progreso</h2>
          <Card className="p-6 bg-white border-2 border-gray-300">
            <div className="space-y-4">
              {modules.map(module => (
                <div key={module.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">{module.title}</span>
                    <span className={`font-bold ${
                      completedModules.includes(module.id)
                        ? 'text-green-600'
                        : 'text-gray-600'
                    }`}>
                      {completedModules.includes(module.id) ? '✓ Completado' : 'Pendiente'}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        completedModules.includes(module.id)
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                      }`}
                      style={{
                        width: completedModules.includes(module.id) ? '100%' : '0%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Workshop Button */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Listo para la Evaluación?</h2>
          <Button
            onClick={() => setLocation('/workshop')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 text-lg rounded-lg shadow-lg"
          >
            Ir al Workshop Final →
          </Button>
          <p className="text-gray-600 mt-4 text-sm">
            Completa todos los módulos antes de hacer el workshop final
          </p>
        </div>

        {/* Tips Section */}
        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">💡 Consejos para Aprender Mejor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <p className="font-semibold text-gray-800">Tómate tu tiempo</p>
                <p className="text-sm text-gray-700">No hay prisa. Aprende a tu propio ritmo.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-semibold text-gray-800">Sé consistente</p>
                <p className="text-sm text-gray-700">Practica regularmente para mejores resultados.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <p className="font-semibold text-gray-800">Repite los módulos</p>
                <p className="text-sm text-gray-700">Puedes hacer los módulos varias veces.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-semibold text-gray-800">Celebra tus logros</p>
                <p className="text-sm text-gray-700">Cada paso es un progreso hacia el éxito.</p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 px-4 mt-12 text-center">
        <p className="text-sm">
          EducaInteractiva © 2026 | Un espacio para aprender ciencias y nutrición de forma interactiva
        </p>
      </footer>
    </div>
  );
}
