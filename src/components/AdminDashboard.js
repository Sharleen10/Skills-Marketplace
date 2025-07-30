import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Grid, Paper, Typography, Box, Card, List, ListItem,
  ListItemText, ListItemAvatar, Avatar, Button, FormControl,
  InputLabel, Select, MenuItem, FormControlLabel, Switch,
  Chip  // Added this import
} from '@mui/material';
import {
  TrendingUp, Speed, PersonAdd, EmojiEvents, Analytics,
  Psychology, AutoAwesome, Assignment, Timeline, NotificationsActive,
  SmartToy  // Added this import
} from '@mui/icons-material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);

  const skillGapData = {
    labels: ['AI/ML', 'Cloud Computing', 'Data Analysis', 'Leadership', 'Product Management', 'UX Design', 'DevOps'],
    datasets: [
      {
        label: 'Current Supply',
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: '#667eea',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 45, 38],
      },
      {
        label: 'Projected Demand',
        backgroundColor: 'rgba(240, 147, 251, 0.8)',
        borderColor: '#f093fb',
        borderWidth: 2,
        data: [95, 85, 95, 90, 80, 75, 68],
      },
      {
        label: 'Gap Analysis',
        type: 'line',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#ff6384',
        borderWidth: 3,
        data: [30, 26, 15, 9, 24, 30, 30],
        yAxisID: 'y1',
      },
    ],
  };

  const mobilityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Internal Hires',
        data: [12, 19, 15, 22, 18, 25, 28],
        fill: false,
        backgroundColor: '#667eea',
        borderColor: '#667eea',
        tension: 0.4,
      },
      {
        label: 'Project Participation',
        data: [5, 8, 12, 15, 20, 28, 35],
        fill: false,
        backgroundColor: '#f093fb',
        borderColor: '#f093fb',
        tension: 0.4,
      },
      {
        label: 'Cross-Department Moves',
        data: [3, 5, 8, 10, 12, 15, 18],
        fill: false,
        backgroundColor: '#43e97b',
        borderColor: '#43e97b',
        tension: 0.4,
      },
    ],
  };

  const skillsDistributionData = {
    labels: ['Technical Skills', 'Leadership', 'Soft Skills', 'Domain Expertise', 'Emerging Tech'],
    datasets: [{
      data: [35, 20, 25, 15, 5],
      backgroundColor: ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#ffa726'],
      borderWidth: 0,
    }],
  };

  const engagementData = {
    labels: ['Profile Updates', 'Skill Assessments', 'Learning Paths', 'Applications', 'Mentoring'],
    datasets: [{
      label: 'Engagement Rate (%)',
      data: [85, 72, 68, 45, 38],
      backgroundColor: [
        'rgba(102, 126, 234, 0.8)',
        'rgba(240, 147, 251, 0.8)',
        'rgba(75, 172, 254, 0.8)',
        'rgba(67, 233, 123, 0.8)',
        'rgba(255, 167, 38, 0.8)'
      ],
      borderColor: [
        '#667eea',
        '#f093fb',
        '#4facfe',
        '#43e97b',
        '#ffa726'
      ],
      borderWidth: 2,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Number of Employees' },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: { display: true, text: 'Gap Percentage' },
        grid: { drawOnChartArea: false },
      },
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  return (
    <Box sx={{ p: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center' }}>
            <Analytics sx={{ mr: 2, fontSize: 40, color: '#667eea' }} />
            AI Analytics Dashboard
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Real-time insights into talent mobility and skills landscape
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl size="small">
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{ minWidth: 120, backgroundColor: 'white' }}
            >
              <MenuItem value="3months">3 Months</MenuItem>
              <MenuItem value="6months">6 Months</MenuItem>
              <MenuItem value="1year">1 Year</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={showAdvancedMetrics}
                onChange={(e) => setShowAdvancedMetrics(e.target.checked)}
              />
            }
            label="Advanced Metrics"
          />
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            textAlign: 'center', 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              287
            </Typography>
            <Typography variant="body2">
              Active Internal Moves
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              ↑ 23% from last quarter
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            textAlign: 'center', 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white'
          }}>
            <Speed sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              94%
            </Typography>
            <Typography variant="body2">
              AI Match Accuracy
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              ML model performance
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            textAlign: 'center', 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white'
          }}>
            <PersonAdd sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              156
            </Typography>
            <Typography variant="body2">
              Skills Acquired
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              This month
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            textAlign: 'center', 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white'
          }}>
            <EmojiEvents sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              78%
            </Typography>
            <Typography variant="body2">
              Employee Satisfaction
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              With AI recommendations
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Timeline sx={{ mr: 1, color: '#667eea' }} />
                Advanced Skill Gap Analysis
              </Typography>
              <Chip label="AI Powered" color="primary" size="small" />
            </Box>
            <Box sx={{ height: 400 }}>
              <Bar data={skillGapData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <Psychology sx={{ mr: 1, color: '#f093fb' }} />
              Skills Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <Pie data={skillsDistributionData} options={pieOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1, color: '#4facfe' }} />
              Internal Mobility Trends
            </Typography>
            <Box sx={{ height: 350 }}>
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
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <NotificationsActive sx={{ mr: 1, color: '#43e97b' }} />
              Platform Engagement
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar data={engagementData} options={{
                ...chartOptions,
                indexAxis: 'y',
                scales: {
                  x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Engagement Rate (%)',
                    },
                  }
                }
              }} />
            </Box>
          </Paper>
        </Grid>

        {showAdvancedMetrics && (
          <>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <SmartToy sx={{ mr: 1, color: '#667eea' }} />
                  AI-Generated Insights
                </Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: '#667eea' }}>
                        <TrendingUp />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="High-Demand Skills Identified"
                      secondary="AI/ML skills show 47% higher demand than supply. Recommend immediate reskilling initiatives."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: '#f093fb' }}>
                        <Psychology />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Cross-Department Mobility Success"
                      secondary="Engineering to Product transitions show 89% success rate with proper mentoring."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: '#43e97b' }}>
                        <AutoAwesome />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Emerging Skill Trends"
                      secondary="Quantum computing and sustainable tech skills projected to be critical by Q3 2025."
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <Assignment sx={{ mr: 1, color: '#4facfe' }} />
                  Recommended Actions
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Launch AI/ML Bootcamp"
                      secondary="Target 50 employees in Q1 to address critical skill gap"
                    />
                    <Button size="small" variant="outlined">
                      Plan
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Expand Mentorship Program"
                      secondary="Increase mentor-mentee matches by 40% to support transitions"
                    />
                    <Button size="small" variant="outlined">
                      Execute
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Create Leadership Pipeline"
                      secondary="Identify and develop 25 high-potential employees for leadership roles"
                    />
                    <Button size="small" variant="outlined">
                      Review
                    </Button>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;