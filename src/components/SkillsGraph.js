import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { SmartToy } from '@mui/icons-material';

ChartJS.register(ArcElement, Tooltip, Legend);

const SkillsGraph = ({ skillData }) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}% proficiency`;
          },
        },
      },
    },
  };

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <SmartToy sx={{ mr: 1, color: '#667eea' }} />
        AI-Powered Skill Analysis
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
        Personalized insights based on your profile and career goals
      </Typography>
      <Box sx={{ height: 300 }}>
        <Doughnut data={skillData} options={options} />
      </Box>
    </Paper>
  );
};

export default SkillsGraph;