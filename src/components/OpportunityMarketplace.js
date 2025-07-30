// src/components/OpportunityMarketplace.js
import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { Business, Code, School, Group } from '@mui/icons-material';

const OpportunityMarketplace = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState({});
  const [applicationNotes, setApplicationNotes] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const opportunities = [
    {
      id: 1,
      type: 'project',
      title: 'AI Chatbot Development',
      description: 'Lead the development of an internal AI chatbot to improve HR service delivery. This project will involve natural language processing, integration with company systems, and user experience design. The ideal candidate will have experience with AI technologies and project management.',
      skills: ['AI/ML', 'Python', 'NLP', 'Project Management'],
      duration: '3 months (20% time)',
      match: 92,
      department: 'Engineering',
      manager: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'role',
      title: 'Product Manager - AI Solutions',
      description: 'Internal transfer opportunity to lead our AI product development team. You will define product strategy, work with cross-functional teams, and drive product development from conception to launch. Previous experience with AI products is preferred but not required.',
      skills: ['Product Management', 'AI/ML', 'Leadership', 'Agile'],
      duration: 'Full-time',
      match: 85,
      department: 'Product',
      manager: 'Michael Chen'
    },
    {
      id: 3,
      type: 'mentorship',
      title: 'Machine Learning Mentor',
      description: 'Mentor junior engineers on ML best practices and model deployment. This is a great opportunity to develop leadership skills while helping others grow. Time commitment is approximately 2 hours per week.',
      skills: ['Mentoring', 'Machine Learning', 'Communication'],
      duration: '6 months',
      match: 78,
      department: 'Engineering',
      manager: 'David Wilson'
    },
    {
      id: 4,
      type: 'learning',
      title: 'AI Product Management Nanodegree',
      description: 'Sponsored learning opportunity to develop product management skills for AI products. The company will cover the cost of this 3-month program for selected applicants. Participants will complete coursework while continuing their regular duties.',
      skills: ['Product Management', 'AI/ML'],
      duration: '3 months',
      match: 90,
      department: 'Learning & Development',
      manager: 'Emily Rodriguez'
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDialogOpen = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setOpenDialog(true);
    setApplicationNotes('');
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleApply = (opportunityId) => {
    // In a real app, you would send this to your backend
    setApplicationStatus(prev => ({
      ...prev,
      [opportunityId]: 'Applied'
    }));
    setSnackbarMessage(`Application submitted for ${selectedOpportunity.title}`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    handleDialogClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredOpportunities = opportunities.filter(opp => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return opp.type === 'role';
    if (tabValue === 2) return opp.type === 'project';
    if (tabValue === 3) return opp.type === 'mentorship';
    if (tabValue === 4) return opp.type === 'learning';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'role': return <Business sx={{ mr: 1 }} />;
      case 'project': return <Code sx={{ mr: 1 }} />;
      case 'learning': return <School sx={{ mr: 1 }} />;
      case 'mentorship': return <Group sx={{ mr: 1 }} />;
      default: return <Business sx={{ mr: 1 }} />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Opportunity Marketplace
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label="All" />
        <Tab label="Roles" icon={<Business />} iconPosition="start" />
        <Tab label="Projects" icon={<Code />} iconPosition="start" />
        <Tab label="Mentorship" icon={<Group />} iconPosition="start" />
        <Tab label="Learning" icon={<School />} iconPosition="start" />
      </Tabs>

      <Grid container spacing={3}>
        {filteredOpportunities.map((opportunity) => (
          <Grid item xs={12} sm={6} key={opportunity.id}>
            <Card
              sx={{
                mb: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  {getIcon(opportunity.type)}
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {opportunity.title}
                  </Typography>
                  <Chip
                    label={`${opportunity.match}% match`}
                    color="primary"
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {opportunity.description.substring(0, 150)}...
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Required Skills:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
                  {opportunity.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Typography variant="subtitle2">
                  Duration: {opportunity.duration}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handleDialogOpen(opportunity)}
                >
                  Learn More
                </Button>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handleDialogOpen(opportunity)}
                  disabled={applicationStatus[opportunity.id] === 'Applied'}
                >
                  {applicationStatus[opportunity.id] === 'Applied' ? 'Applied' : 'Express Interest'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Opportunity Details Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            {selectedOpportunity && getIcon(selectedOpportunity.type)}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {selectedOpportunity?.title}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" paragraph>
              {selectedOpportunity?.description}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Details:
                </Typography>
                <Typography variant="body2">
                  <strong>Department:</strong> {selectedOpportunity?.department}
                </Typography>
                <Typography variant="body2">
                  <strong>Reporting Manager:</strong> {selectedOpportunity?.manager}
                </Typography>
                <Typography variant="body2">
                  <strong>Duration:</strong> {selectedOpportunity?.duration}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Required Skills:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {selectedOpportunity?.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>

            <TextField
              label="Application Notes (Optional)"
              multiline
              fullWidth
              rows={4}
              value={applicationNotes}
              onChange={(e) => setApplicationNotes(e.target.value)}
              variant="outlined"
              sx={{ mt: 3 }}
              placeholder="Explain why you're interested in this opportunity and any relevant experience..."
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={() => handleApply(selectedOpportunity?.id)}
            variant="contained" 
            color="primary"
            disabled={applicationStatus[selectedOpportunity?.id] === 'Applied'}
          >
            {applicationStatus[selectedOpportunity?.id] === 'Applied' ? 'Already Applied' : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OpportunityMarketplace;