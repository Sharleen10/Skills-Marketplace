// src/components/EmployeeDashboard.js
import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Chip,
  TextField,
  Button,
  Avatar,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Work, School, Groups, Star } from '@mui/icons-material';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const profiles = [
  {
    id: 1,
    name: 'Jane Doe',
    title: 'Senior Software Engineer',
    avatar: 'JD',
    department: 'Engineering',
    skills: ['React', 'JavaScript', 'Project Management', 'Machine Learning'],
    aspirations: 'I want to transition into AI product management and lead cross-functional teams.',
    completedProjects: 12,
    learningHours: 45,
    mentorshipSessions: 8,
    performanceRating: 4.5
  },
  {
    id: 2,
    name: 'John Smith',
    title: 'Data Scientist',
    avatar: 'JS',
    department: 'Data Science',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'TensorFlow'],
    aspirations: 'I aim to become a lead AI researcher and publish papers in top conferences.',
    completedProjects: 8,
    learningHours: 32,
    mentorshipSessions: 5,
    performanceRating: 4.2
  },
  {
    id: 3,
    name: 'Alex Johnson',
    title: 'Product Manager',
    avatar: 'AJ',
    department: 'Product',
    skills: ['Product Strategy', 'Agile', 'Market Research', 'UX', 'Roadmapping'],
    aspirations: 'I want to drive product innovation in AI-powered solutions.',
    completedProjects: 15,
    learningHours: 28,
    mentorshipSessions: 10,
    performanceRating: 4.7
  }
];

const EmployeeDashboard = () => {
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  const [newSkill, setNewSkill] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [tempAspirations, setTempAspirations] = useState('');

  const handleProfileChange = (event) => {
    const selectedId = event.target.value;
    const profile = profiles.find(p => p.id === selectedId);
    setSelectedProfile(profile);
    setTempAspirations(profile.aspirations);
    setEditMode(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setSelectedProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleEditAspirations = () => {
    setTempAspirations(selectedProfile.aspirations);
    setEditMode(true);
  };

  const handleSaveAspirations = () => {
    setSelectedProfile(prev => ({
      ...prev,
      aspirations: tempAspirations
    }));
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const data = {
    labels: [...selectedProfile.skills, 'Leadership', 'Communication'],
    datasets: [
      {
        data: [90, 85, 80, 75, 70, 65, 60],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#8AC24A',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#8AC24A',
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
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
    <Box sx={{ p: 3 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Profile</InputLabel>
        <Select
          value={selectedProfile.id}
          label="Select Profile"
          onChange={handleProfileChange}
        >
          {profiles.map(profile => (
            <MenuItem key={profile.id} value={profile.id}>
              {profile.name} - {profile.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Star color="primary" fontSize="small" />
                }
              >
                <Avatar sx={{ width: 80, height: 80 }}>
                  {selectedProfile.avatar}
                </Avatar>
              </Badge>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h5">{selectedProfile.name}</Typography>
                <Typography variant="subtitle1">{selectedProfile.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedProfile.department}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mt: 2 }}>
              My Skills
            </Typography>
            <Box sx={{ my: 1, display: 'flex', flexWrap: 'wrap' }}>
              {selectedProfile.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{ m: 0.5 }}
                  onDelete={() => handleRemoveSkill(skill)}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TextField
                label="Add new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                size="small"
                sx={{ mr: 1, flexGrow: 1 }}
              />
              <Button 
                onClick={handleAddSkill} 
                variant="contained" 
                color="primary"
                disabled={!newSkill.trim()}
              >
                Add
              </Button>
            </Box>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Career Aspirations
            </Typography>
            {editMode ? (
              <Box>
                <TextField
                  multiline
                  fullWidth
                  rows={4}
                  value={tempAspirations}
                  onChange={(e) => setTempAspirations(e.target.value)}
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleCancelEdit} sx={{ mr: 1 }}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveAspirations} 
                    variant="contained" 
                    color="primary"
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                  {selectedProfile.aspirations}
                </Typography>
                <Button 
                  onClick={handleEditAspirations}
                  variant="outlined"
                  size="small"
                >
                  Edit Aspirations
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5">AI Recommendations</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Based on your skills and aspirations, we recommend these opportunities
            </Typography>

            <Box sx={{ height: 300, mt: 3 }}>
              <Doughnut data={data} options={options} />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Career Highlights
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Work color="primary" fontSize="large" />
                  <Typography variant="h6">{selectedProfile.completedProjects}</Typography>
                  <Typography variant="body2">Projects Completed</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <School color="primary" fontSize="large" />
                  <Typography variant="h6">{selectedProfile.learningHours}</Typography>
                  <Typography variant="body2">Learning Hours</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Groups color="primary" fontSize="large" />
                  <Typography variant="h6">{selectedProfile.mentorshipSessions}</Typography>
                  <Typography variant="body2">Mentorship Sessions</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Star color="primary" fontSize="large" />
                  <Typography variant="h6">{selectedProfile.performanceRating}/5</Typography>
                  <Typography variant="body2">Performance Rating</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Recommended Learning Paths
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <School />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="AI Product Management Certification"
                  secondary="3 month program covering AI product strategy and development"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Work />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Leadership Training Program"
                  secondary="6 week intensive for emerging leaders"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;