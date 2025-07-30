import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, Typography, Chip, TextField, Button, Avatar, Box,
  Select, MenuItem, FormControl, InputLabel, Divider, List, ListItem,
  ListItemText, ListItemAvatar, Badge, Card, CardContent, CardActions,
  LinearProgress
} from '@mui/material';
import {
  Work, School, Groups, Star, Engineering, Lightbulb,
  MenuBook, EmojiEvents, AutoAwesome, Psychology
} from '@mui/icons-material';
import { generateSkillData, generateLearningPaths } from '../data/profiles';
import { profiles } from '../data/profiles';  // Added this import
import SkillsGraph from './SkillsGraph';

const EmployeeDashboard = ({ selectedProfile, setSelectedProfile }) => {
  const [newSkill, setNewSkill] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [tempAspirations, setTempAspirations] = useState('');
  const [aiInsights, setAiInsights] = useState([]);

  useEffect(() => {
    const insights = [
      `Based on your ${selectedProfile.skills.join(', ')} skills, you're 85% ready for senior AI roles`,
      `Your project completion rate is 23% above company average`,
      `Colleagues with similar profiles typically advance to leadership within 18 months`,
      `Your skill combination is rare - only 12% of employees have this profile`
    ];
    setAiInsights(insights);
    setTempAspirations(selectedProfile.aspirations);
  }, [selectedProfile]);

  const handleProfileChange = (event) => {
    const selectedId = event.target.value;
    const profile = profiles.find(p => p.id === selectedId);
    setSelectedProfile(profile);
    setEditMode(false);
  };

  const skillData = generateSkillData(selectedProfile);
  const learningPaths = generateLearningPaths(selectedProfile);

  return (
    <Box sx={{ p: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Profile</InputLabel>
        <Select
          value={selectedProfile.id}
          label="Select Profile"
          onChange={handleProfileChange}
          sx={{ backgroundColor: 'white' }}
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
          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={<AutoAwesome sx={{ color: '#FFD700' }} />}
                >
                  <Avatar sx={{ width: 80, height: 80, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    {selectedProfile.avatar}
                  </Avatar>
                </Badge>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {selectedProfile.name}
                  </Typography>
                  <Typography variant="subtitle1">{selectedProfile.title}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {selectedProfile.department} • {selectedProfile.experienceLevel}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Psychology sx={{ mr: 1 }} />
                  <Typography variant="h6">AI Insights</Typography>
                </Box>
                {aiInsights.slice(0, 2).map((insight, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                    • {insight}
                  </Typography>
                ))}
              </Box>

              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Engineering sx={{ mr: 1 }} />
                My Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                {selectedProfile.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{ 
                      m: 0.5, 
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                    }}
                    onDelete={() => {}}
                  />
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TextField
                  label="Add new skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  size="small"
                  sx={{ 
                    mr: 1, 
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' }
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                />
                <Button 
                  onClick={() => setNewSkill('')} 
                  variant="contained"
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Lightbulb sx={{ mr: 1, color: '#FFD700' }} />
              Career Aspirations
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedProfile.aspirations}
            </Typography>
            <Button variant="outlined" size="small">
              Update Goals
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <SkillsGraph skillData={skillData} />

          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <MenuBook sx={{ mr: 1, color: '#4CAF50' }} />
              Recommended Learning Paths
            </Typography>
            
            <Grid container spacing={2}>
              {learningPaths.map((path, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                    }
                  }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {path.title}
                        </Typography>
                        <Chip 
                          label={`${path.relevanceScore}% match`} 
                          color="primary" 
                          size="small"
                          sx={{ minWidth: 'auto' }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {path.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                          Duration: {path.duration} • {path.difficulty}
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={path.relevanceScore} 
                          sx={{ mt: 1, borderRadius: 1 }}
                        />
                      </Box>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Key Modules:
                      </Typography>
                      {path.modules.slice(0, 2).map((module, idx) => (
                        <Chip 
                          key={idx} 
                          label={module} 
                          size="small" 
                          variant="outlined" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant="contained">
                        Start Learning
                      </Button>
                      <Button size="small">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <EmojiEvents sx={{ mr: 1, color: '#FF9800' }} />
              Career Highlights
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                  <Work fontSize="large" />
                  <Typography variant="h6">{selectedProfile.completedProjects}</Typography>
                  <Typography variant="body2">Projects</Typography>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                  <School fontSize="large" />
                  <Typography variant="h6">{selectedProfile.learningHours}</Typography>
                  <Typography variant="body2">Learning Hours</Typography>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
                  <Groups fontSize="large" />
                  <Typography variant="h6">{selectedProfile.mentorshipSessions}</Typography>
                  <Typography variant="body2">Mentorships</Typography>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
                  <Star fontSize="large" />
                  <Typography variant="h6">{selectedProfile.performanceRating}/5</Typography>
                  <Typography variant="body2">Rating</Typography>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;