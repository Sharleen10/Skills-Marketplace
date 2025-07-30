// src/components/AdminDashboard.js
import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const skillGapData = {
    labels: ['AI/ML', 'Cloud Computing', 'Data Analysis', 'Leadership', 'Product Management'],
    datasets: [
      {
        label: 'Current Supply',
        backgroundColor: '#4BC0C0',
        data: [65, 59, 80, 81, 56],
      },
      {
        label: 'Projected Demand',
        backgroundColor: '#9966FF',
        data: [85, 75, 95, 90, 80],
      },
    ],
  };

  const mobilityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Internal Hires',
        data: [12, 19, 15, 22, 18, 25],
        fill: false,
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
      },
      {
        label: 'Project Participation',
        data: [5, 8, 12, 15, 20, 28],
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Employees',
        },
      },
    },
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3, mb: 3, height: '100%' }}>
            <Typography variant="h6">Skill Gap Analysis</Typography>
            <Box sx={{ height: 300, mt: 3 }}>
              <Bar
                data={skillGapData}
                options={chartOptions}
                key="skill-gap-chart"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3, mb: 3, height: '100%' }}>
            <Typography variant="h6">Internal Mobility Trends</Typography>
            <Box sx={{ height: 300, mt: 3 }}>
              <Line
                data={mobilityData}
                options={{
                  ...chartOptions,
                  scales: {
                    y: {
                      ...chartOptions.scales.y,
                      title: {
                        display: true,
                        text: 'Number of Participants',
                      },
                    },
                  },
                }}
                key="mobility-trends-chart"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6">Top Skills in Demand</Typography>
            <ul>
              <li>AI/ML Engineering (32% gap)</li>
              <li>Cloud Architecture (25% gap)</li>
              <li>Data Science (18% gap)</li>
              <li>Product Management (15% gap)</li>
              <li>UX Design (12% gap)</li>
            </ul>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6">Platform Engagement</Typography>
            <ul>
              <li>85% employee profiles updated</li>
              <li>62% active monthly users</li>
              <li>45 internal hires last quarter</li>
              <li>120 project participations</li>
              <li>78 mentorship matches</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;