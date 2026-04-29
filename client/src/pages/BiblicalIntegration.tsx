import React from 'react';
import { BiblicalIntegrationModule } from '@/components/modules/BiblicalIntegrationModule';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';

export default function BiblicalIntegration() {
  const { setModuleScore, addCompletedModule } = useUser();
  const [, setLocation] = useLocation();

  const handleComplete = (score: number) => {
    setModuleScore('biblicalIntegration', score);
    addCompletedModule('biblicalIntegration');
    setLocation('/');
  };

  return <BiblicalIntegrationModule onComplete={handleComplete} />;
}
