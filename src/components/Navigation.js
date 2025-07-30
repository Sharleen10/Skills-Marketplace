// src/components/Navigation.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Skills Marketplace
        </Typography>
        <Button color="inherit" component={Link} to="/employee">
          My Profile
        </Button>
        <Button color="inherit" component={Link} to="/opportunities">
          Marketplace
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;