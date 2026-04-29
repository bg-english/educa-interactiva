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
    console.log(`Nutrición completed with score: ${score}`);
    setCurrentView('menu');
  };

  const handleModuleComplete = () => {
    const averageScore = 80; // Placeholder
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
            ← Volver al Menú
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
            ← Volver al Menú
          </Button>
        </div>
        <FoodGroups />
      </div>
    );
  }

  // Menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Nutrición y Plato Balanceado</h1>
          <p className="text-lg text-gray-600">
            Aprende a crear comidas saludables y balanceadas
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Balanced Plate Card */}
          <Card className="p-8 bg-gradient-to-br from-orange-100 to-red-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <h2 className="text-2xl font-bold text-orange-700 mb-3">Plato Balanceado</h2>
              <p className="text-gray-700 mb-6">
                Arrastra alimentos al plato para crear una comida balanceada. Aprende qué proporciones
                de cada grupo de alimentos necesitas para una nutrición óptima.
              </p>
              <Button
                onClick={() => setCurrentView('plate')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3"
              >
                Jugar Plato Balanceado
              </Button>
            </div>
          </Card>

          {/* Food Groups Card */}
          <Card className="p-8 bg-gradient-to-br from-green-100 to-emerald-100 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-6xl mb-4">🥗</div>
              <h2 className="text-2xl font-bold text-green-700 mb-3">Grupos de Alimentos</h2>
              <p className="text-gray-700 mb-6">
                Descubre los cinco grupos principales de alimentos, sus beneficios para la salud,
                ejemplos de cada grupo y las porciones recomendadas diarias.
              </p>
              <Button
                onClick={() => setCurrentView('groups')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
              >
                Ver Grupos de Alimentos
              </Button>
            </div>
          </Card>
        </div>

        {/* Educational Content */}
        <Card className="p-8 bg-white border-2 border-orange-200 mb-8">
          <h3 className="text-2xl font-bold text-orange-700 mb-4">¿Por qué es importante una buena nutrición?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">💪 Energía</h4>
              <p className="text-sm text-gray-700">
                Los alimentos proporcionan la energía que necesitas para realizar tus actividades diarias.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">🧬 Crecimiento</h4>
              <p className="text-sm text-gray-700">
                Las proteínas y otros nutrientes son esenciales para tu crecimiento y desarrollo.
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-bold text-red-700 mb-2">🛡️ Salud</h4>
              <p className="text-sm text-gray-700">
                Una buena nutrición fortalece tu sistema inmunológico y previene enfermedades.
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
