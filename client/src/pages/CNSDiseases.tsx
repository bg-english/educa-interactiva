import React from 'react';
import { CNSDiseasesModule } from '@/components/modules/CNSDiseasesModule';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';

export default function CNSDiseases() {
  const { setModuleScore, addCompletedModule } = useUser();
  const [, setLocation] = useLocation();

  const handleComplete = (score: number) => {
    setModuleScore('cnsDisorders', score);
    addCompletedModule('cnsDisorders');
    setLocation('/');
  };

  return <CNSDiseasesModule onComplete={handleComplete} />;
}
