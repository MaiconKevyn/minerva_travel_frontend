
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import CreateGuidePage from './CreateGuidePage.jsx';

const ProtectedCreateGuidePage = () => {
  return (
    <ProtectedRoute>
      <CreateGuidePage />
    </ProtectedRoute>
  );
};

export default ProtectedCreateGuidePage;
