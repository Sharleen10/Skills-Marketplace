import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navigation from './components/Navigation';
import EmployeeDashboard from './components/EmployeeDashboard';
import OpportunityMarketplace from './components/OpportunityMarketplace';
import AdminDashboard from './components/AdminDashboard';
import { profiles } from './data/profiles';

const App = () => {
  const [currentView, setCurrentView] = useState('employee');
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'employee':
        return <EmployeeDashboard selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />;
      case 'opportunities':
        return <OpportunityMarketplace selectedProfile={selectedProfile} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <EmployeeDashboard selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      {renderCurrentView()}
    </Box>
  );
};

export default App;