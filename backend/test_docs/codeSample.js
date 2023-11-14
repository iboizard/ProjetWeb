// To create a new project
Project.create({
    name: 'New Project',
    description: 'Project Description',
    objectives: 'Project Objectives',
    deadline: new Date(2023, 0, 25), // For January 25, 2023
    budget: 10000
  }).then(project => {
    console.log('New project created:', project.toJSON());
  });
  