import React from 'react';
import { EatingDisordersModule } from '@/components/modules/EatingDisordersModule';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';

export default function EatingDisorders() {
  const { setModuleScore, addCompletedModule } = useUser();
  const [, setLocation] = useLocation();

  const handleComplete = (score: number) => {
    setModuleScore('eatingDisorders', score);
    addCompletedModule('eatingDisorders');
    setLocation('/');
  };

  return <EatingDisordersModule onComplete={handleComplete} />;
}
