import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { SmartToy } from '@mui/icons-material';

const Navigation = ({ currentView, setCurrentView }) => {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Toolbar>
        <SmartToy sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          AI Skills Marketplace
        </Typography>
        <Button 
          color="inherit" 
          onClick={() => setCurrentView('employee')}
          sx={{ 
            mx: 1, 
            backgroundColor: currentView === 'employee' ? 'rgba(255,255,255,0.2)' : 'transparent',
            borderRadius: 2
          }}
        >
          My Profile
        </Button>
        <Button 
          color="inherit" 
          onClick={() => setCurrentView('opportunities')}
          sx={{ 
            mx: 1, 
            backgroundColor: currentView === 'opportunities' ? 'rgba(255,255,255,0.2)' : 'transparent',
            borderRadius: 2
          }}
        >
          Marketplace
        </Button>
        <Button 
          color="inherit" 
          onClick={() => setCurrentView('admin')}
          sx={{ 
            mx: 1, 
            backgroundColor: currentView === 'admin' ? 'rgba(255,255,255,0.2)' : 'transparent',
            borderRadius: 2
          }}
        >
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;