export const profiles = [
  {
    id: 1,
    name: 'Jane Doe',
    title: 'Senior Software Engineer',
    avatar: 'JD',
    department: 'Engineering',
    skills: ['React', 'JavaScript', 'Project Management', 'Machine Learning', 'Python', 'AWS'],
    aspirations: 'I want to transition into AI product management and lead cross-functional teams to build innovative AI solutions.',
    completedProjects: 12,
    learningHours: 45,
    mentorshipSessions: 8,
    performanceRating: 4.5,
    experienceLevel: 'Senior',
    personality: 'analytical',
    preferredLearningStyle: 'hands-on'
  },
  {
    id: 2,
    name: 'John Smith',
    title: 'Data Scientist',
    avatar: 'JS',
    department: 'Data Science',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'TensorFlow', 'Statistics'],
    aspirations: 'I aim to become a lead AI researcher and publish papers in top conferences while driving business impact.',
    completedProjects: 8,
    learningHours: 32,
    mentorshipSessions: 5,
    performanceRating: 4.2,
    experienceLevel: 'Mid',
    personality: 'research-oriented',
    preferredLearningStyle: 'theoretical'
  },
  {
    id: 3,
    name: 'Alex Johnson',
    title: 'Product Manager',
    avatar: 'AJ',
    department: 'Product',
    skills: ['Product Strategy', 'Agile', 'Market Research', 'UX', 'Roadmapping', 'Data Analysis'],
    aspirations: 'I want to drive product innovation in AI-powered solutions and expand into international markets.',
    completedProjects: 15,
    learningHours: 28,
    mentorshipSessions: 10,
    performanceRating: 4.7,
    experienceLevel: 'Senior',
    personality: 'strategic',
    preferredLearningStyle: 'collaborative'
  },
  {
    id: 4,
    name: 'Maria Garcia',
    title: 'UX Designer',
    avatar: 'MG',
    department: 'Design',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Systems'],
    aspirations: 'I want to specialize in AI/Human interaction design and become a principal designer.',
    completedProjects: 20,
    learningHours: 55,
    mentorshipSessions: 12,
    performanceRating: 4.6,
    experienceLevel: 'Mid',
    personality: 'creative',
    preferredLearningStyle: 'visual'
  }
];

export const generateOpportunities = (userProfile) => {
  const baseOpportunities = [
    {
      id: 1,
      type: 'project',
      title: 'AI Chatbot Development',
      description: 'Lead the development of an internal AI chatbot to improve HR service delivery.',
      skills: ['AI/ML', 'Python', 'NLP', 'Project Management'],
      duration: '3 months (20% time)',
      department: 'Engineering',
      manager: 'Sarah Johnson',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      type: 'role',
      title: 'Product Manager - AI Solutions',
      description: 'Internal transfer opportunity to lead our AI product development team.',
      skills: ['Product Management', 'AI/ML', 'Leadership', 'Agile'],
      duration: 'Full-time',
      department: 'Product',
      manager: 'Michael Chen',
      difficulty: 'Advanced'
    },
    {
      id: 3,
      type: 'mentorship',
      title: 'Machine Learning Mentor',
      description: 'Mentor junior engineers on ML best practices and model deployment.',
      skills: ['Mentoring', 'Machine Learning', 'Communication'],
      duration: '6 months',
      department: 'Engineering',
      manager: 'David Wilson',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      type: 'learning',
      title: 'AI Product Management Nanodegree',
      description: 'Sponsored learning opportunity to develop product management skills for AI products.',
      skills: ['Product Management', 'AI/ML'],
      duration: '3 months',
      department: 'Learning & Development',
      manager: 'Emily Rodriguez',
      difficulty: 'Beginner'
    }
  ];

  return baseOpportunities.map(opp => {
    const matchingSkills = opp.skills.filter(skill => 
      userProfile.skills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    
    let baseMatch = (matchingSkills.length / opp.skills.length) * 60;
    
    if (opp.department === userProfile.department) baseMatch += 15;
    
    if (userProfile.experienceLevel === 'Senior' && opp.difficulty === 'Advanced') baseMatch += 10;
    if (userProfile.experienceLevel === 'Mid' && opp.difficulty === 'Intermediate') baseMatch += 10;
    
    const finalMatch = Math.min(95, Math.max(45, baseMatch + Math.random() * 20));
    
    return {
      ...opp,
      match: Math.round(finalMatch)
    };
  }).sort((a, b) => b.match - a.match);
};

export const generateLearningPaths = (userProfile) => {
  const allPaths = {
    'analytical': [
      {
        title: 'Advanced Machine Learning Engineering',
        description: 'Deep dive into MLOps, model optimization, and production deployment',
        duration: '4 months',
        modules: ['MLOps Fundamentals', 'Model Optimization', 'Production Deployment', 'A/B Testing for ML'],
        difficulty: 'Advanced',
        relevanceScore: 95
      },
      {
        title: 'Data Architecture & Engineering',
        description: 'Master data pipelines, warehousing, and real-time processing',
        duration: '3 months',
        modules: ['Data Pipeline Design', 'Apache Kafka', 'Data Warehousing', 'Stream Processing'],
        difficulty: 'Intermediate',
        relevanceScore: 85
      }
    ],
    'research-oriented': [
      {
        title: 'Research Methodology in AI',
        description: 'Learn to conduct and publish cutting-edge AI research',
        duration: '6 months',
        modules: ['Research Design', 'Statistical Analysis', 'Paper Writing', 'Peer Review Process'],
        difficulty: 'Advanced',
        relevanceScore: 98
      },
      {
        title: 'Advanced Deep Learning',
        description: 'Explore transformer architectures, GANs, and reinforcement learning',
        duration: '5 months',
        modules: ['Transformer Networks', 'Generative Models', 'Reinforcement Learning', 'Computer Vision'],
        difficulty: 'Expert',
        relevanceScore: 92
      }
    ],
    'strategic': [
      {
        title: 'AI Product Strategy',
        description: 'Learn to build and scale AI-powered products',
        duration: '3 months',
        modules: ['AI Market Analysis', 'Product Roadmapping', 'Ethics in AI', 'Go-to-Market Strategy'],
        difficulty: 'Intermediate',
        relevanceScore: 96
      },
      {
        title: 'Executive Leadership in Tech',
        description: 'Develop executive presence and strategic thinking skills',
        duration: '4 months',
        modules: ['Strategic Planning', 'Team Leadership', 'Stakeholder Management', 'Innovation Management'],
        difficulty: 'Advanced',
        relevanceScore: 88
      }
    ],
    'creative': [
      {
        title: 'AI-Human Interaction Design',
        description: 'Design intuitive interfaces for AI-powered applications',
        duration: '3 months',
        modules: ['Conversational UI', 'AI Transparency', 'Ethical Design', 'User Trust Building'],
        difficulty: 'Intermediate',
        relevanceScore: 94
      },
      {
        title: 'Advanced Prototyping for AI',
        description: 'Create compelling prototypes for AI features and experiences',
        duration: '2 months',
        modules: ['Rapid Prototyping', 'Interactive Demos', 'User Testing', 'Design Systems'],
        difficulty: 'Intermediate',
        relevanceScore: 87
      }
    ]
  };

  const userPaths = allPaths[userProfile.personality] || allPaths['analytical'];
  const otherPaths = Object.entries(allPaths)
    .filter(([key]) => key !== userProfile.personality)
    .flatMap(([, paths]) => paths)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 1);

  return [...userPaths, ...otherPaths].slice(0, 3);
};

export const generateSkillData = (userProfile) => {
  const skillProficiencies = {};
  
  userProfile.skills.forEach((skill, index) => {
    let proficiency = 70 + Math.random() * 25;
    
    if (userProfile.personality === 'analytical' && ['Python', 'Machine Learning', 'Data Analysis'].includes(skill)) {
      proficiency = Math.min(95, proficiency + 15);
    }
    if (userProfile.personality === 'creative' && ['UI/UX Design', 'Figma', 'Prototyping'].includes(skill)) {
      proficiency = Math.min(95, proficiency + 15);
    }
    
    skillProficiencies[skill] = Math.round(proficiency);
  });

  return {
    labels: Object.keys(skillProficiencies),
    datasets: [{
      data: Object.values(skillProficiencies),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A', '#FF6B6B'
      ],
      hoverBackgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A', '#FF6B6B'
      ],
    }],
  };
};