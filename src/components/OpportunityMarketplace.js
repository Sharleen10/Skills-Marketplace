import React, { useState, useEffect } from 'react';
import {
  Grid, Card, CardContent, CardActions, Typography, Chip,
  Button, Box, Tabs, Tab, Dialog, DialogTitle, DialogContent,
  DialogActions, Tooltip
} from '@mui/material';
import {
  Business, Code, School, Group, AutoAwesome
} from '@mui/icons-material';
import { generateOpportunities } from '../data/profiles';
import { profiles } from '../data/profiles'; 

const OpportunityMarketplace = ({ selectedProfile }) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState({});
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const generatedOpps = generateOpportunities(selectedProfile || profiles[0]);
    setOpportunities(generatedOpps);
  }, [selectedProfile]);

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
      case 'role': return <Business sx={{ mr: 1, color: '#667eea' }} />;
      case 'project': return <Code sx={{ mr: 1, color: '#f093fb' }} />;
      case 'learning': return <School sx={{ mr: 1, color: '#4facfe' }} />;
      case 'mentorship': return <Group sx={{ mr: 1, color: '#43e97b' }} />;
      default: return <Business sx={{ mr: 1 }} />;
    }
  };

  const getMatchColor = (match) => {
    if (match >= 90) return 'success';
    if (match >= 75) return 'primary';
    if (match >= 60) return 'warning';
    return 'default';
  };

  return (
    <Box sx={{ p: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AutoAwesome sx={{ mr: 2, fontSize: 40, color: '#667eea' }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
            AI Opportunity Marketplace
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Personalized opportunities powered by machine learning
          </Typography>
        </Box>
      </Box>

      <Tabs
        value={tabValue}
        onChange={(e, v) => setTabValue(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          mb: 3,
          backgroundColor: 'white',
          borderRadius: 3,
          '& .MuiTab-root': {
            fontWeight: 'bold',
            borderRadius: 2,
            mx: 0.5
          },
          '& .Mui-selected': {
            backgroundColor: '#667eea',
            color: 'white !important'
          }
        }}
      >
        <Tab label="All Opportunities" />
        <Tab label="Roles" icon={<Business />} iconPosition="start" />
        <Tab label="Projects" icon={<Code />} iconPosition="start" />
        <Tab label="Mentorship" icon={<Group />} iconPosition="start" />
        <Tab label="Learning" icon={<School />} iconPosition="start" />
      </Tabs>

      <Grid container spacing={3}>
        {filteredOpportunities.map((opportunity) => (
          <Grid item xs={12} sm={6} lg={4} key={opportunity.id}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: opportunity.match >= 90 ? 'linear-gradient(90deg, #43e97b, #38f9d7)' : 
                             opportunity.match >= 75 ? 'linear-gradient(90deg, #667eea, #764ba2)' :
                             'linear-gradient(90deg, #f093fb, #f5576c)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Box display="flex" alignItems="center">
                    {getIcon(opportunity.type)}
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {opportunity.title}
                    </Typography>
                  </Box>
                  <Chip
                    label={`${opportunity.match}% match`}
                    color={getMatchColor(opportunity.match)}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {opportunity.description.substring(0, 120)}...
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Skills Required:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {opportunity.duration} • {opportunity.department}
                  </Typography>
                  <Box>
                    {opportunity.match >= 85 && (
                      <Tooltip title="Highly Recommended">
                        <AutoAwesome sx={{ color: '#FFD700', mr: 1 }} />
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ px: 3, pb: 2 }}>
                <Button 
                  size="small" 
                  variant="outlined"
                  onClick={() => {
                    setSelectedOpportunity(opportunity);
                    setOpenDialog(true);
                  }}
                >
                  Learn More
                </Button>
                <Button 
                  size="small" 
                  variant="contained"
                  disabled={applicationStatus[opportunity.id] === 'Applied'}
                  sx={{
                    background: applicationStatus[opportunity.id] === 'Applied' ? 
                      'grey' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                    }
                  }}
                >
                  {applicationStatus[opportunity.id] === 'Applied' ? 'Applied' : 'Apply Now'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Box display="flex" alignItems="center">
            {selectedOpportunity && getIcon(selectedOpportunity.type)}
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
              {selectedOpportunity?.title}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            {selectedOpportunity?.description}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Opportunity Details
              </Typography>
              <Typography variant="body2"><strong>Department:</strong> {selectedOpportunity?.department}</Typography>
              <Typography variant="body2"><strong>Manager:</strong> {selectedOpportunity?.manager}</Typography>
              <Typography variant="body2"><strong>Duration:</strong> {selectedOpportunity?.duration}</Typography>
              <Typography variant="body2"><strong>Difficulty:</strong> {selectedOpportunity?.difficulty}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Required Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {selectedOpportunity?.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    color="primary"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained"
            sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            onClick={() => {
              setApplicationStatus(prev => ({
                ...prev,
                [selectedOpportunity?.id]: 'Applied'
              }));
              setOpenDialog(false);
            }}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OpportunityMarketplace;